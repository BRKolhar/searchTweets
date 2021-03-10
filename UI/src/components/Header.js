/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { requestApiDataFilter } from "../layout/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  const [values, setCount] = useState('');
  let onTagsChange = (event, values) => {
    localStorage.setItem("filterValue", JSON.stringify(values));
    setCount(values)
  }
  useEffect(()=>{
    props.requestApiDataFilter();
  }, [values])
  
  return (
    <div className={classes.root}>
          <Autocomplete
            multiple
            id="tags-filled"
            options={filterList.map((option) => option.title)}
            defaultValue={[]}
            freeSolo
            onChange={onTagsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Search" placeholder="" />
            )}
          />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const filterList = [
    // { title: 'Tranding'},
    // { title: 'Demo'}
];

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiDataFilter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);