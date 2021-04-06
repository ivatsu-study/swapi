import { useEffect, useState } from 'react';
import superagent from 'superagent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import logo from './logo.svg';
import './App.css';

import useIsMounted from './hooks/useIsMounted';
import Search from './components/search/Search';

interface StateType {
  navList: string[],
  navHttpGetLink: string[],
}

const initialState: StateType = {
  navList: [],
  navHttpGetLink: [],
};

function App(): JSX.Element {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchData() {
      try {
        if (isMounted.current) {
          const res = await superagent
            .get('https://swapi.dev/api/');

          setState({
            navList: Object.keys(res.body),
            navHttpGetLink: Object.values(res.body),
          });
        }
      } catch (error) {
        throw Error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      {state.navList[0] && (<Redirect exact from="/" to={`${state.navList[0]}`} />)}

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <ul className="l-nav-list">
              {state.navList.map(
                (link) => (
                  <li key={uuidv4()} className="l-nav-list__item">
                    <NavLink
                      to={`/${link}`}
                      className="l-nav-list__link"
                      activeClassName="l-nav-list__link--active"
                    >
                      {link}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </header>
        <Switch>
          {state.navList.map((link, index) => (
            <Route key={uuidv4()} path={`/${link}`}>
              <Search link={state.navHttpGetLink[index]} />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
