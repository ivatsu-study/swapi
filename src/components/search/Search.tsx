import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { debounce } from 'lodash';
import superagent from 'superagent';
import { v4 as uuidv4 } from 'uuid';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

import useIsMounted from '../../hooks/useIsMounted';
import Adornment from './Adornment';
import slugify from '../../utils/slugify';

import './search.css';

interface SearchTypes {
  link: string,
}

interface SearchResultsTypes {
  results: any[],
  searchQuery: string,
}

function SearchResults(props: SearchResultsTypes) {
  const { url } = useRouteMatch();

  const { results, searchQuery } = props;
  if (searchQuery) {
    return (
      <>
        <div className="l-search-results">
          {results.map((item) => (
            <>
              {JSON.stringify(slugify(item.name, '-'))}
              <Link key={uuidv4()} to={`${url}/${slugify(item.name, '-')}`} className="c-search-results__link">{item.name}</Link>
            </>
          ))}
        </div>
      </>
    );
  }
  return null;
}

export default function Search(props: SearchTypes) {
  const { link } = props;

  const isMounted = useIsMounted();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getSearchResults(query: string) {
    setIsLoading(true);
    superagent
      .get(link)
      .query({ search: query })
      .end((err, res) => {
        if (err) {
          setIsLoading(false);
          setSearchResults([]);
          throw Error(err);
        }
        if (isMounted) {
          setSearchResults(res.body.results);
          setIsLoading(false);
        }
      });
  }

  const getSearchResultsWithDebounce = debounce((query) => {
    if (query !== '') {
      getSearchResults(query);
    }
  }, 1000);

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSearchQuery(event.target.value);
    getSearchResultsWithDebounce(event.target.value);
  }

  return (
    <>
      <div className="l-search">
        <TextField
          id="outlined-basic"
          label="Search ..."
          variant="outlined"
          InputProps={{
            endAdornment: <Adornment isLoading={isLoading} />,
          }}
          onChange={onChangeHandler}
          value={searchQuery}
        />
        <SearchResults results={searchResults} searchQuery={searchQuery} />
      </div>
    </>
  );
}
