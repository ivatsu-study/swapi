import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';

interface AdornmentTypes {
  isLoading: boolean,
}

const Adornment = ({ isLoading }: AdornmentTypes) => (
  <InputAdornment position="end">
    {isLoading ? <AutorenewIcon /> : <SearchIcon />}
  </InputAdornment>
);

export default Adornment;
