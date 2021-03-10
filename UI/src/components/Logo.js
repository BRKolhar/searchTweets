/* eslint-disable no-use-before-define */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

function Logo(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
        <Typography gutterBottom variant="h5" style={{textAlign:'center', wordBreak: 'break-all', padding: '15px'}}>
            Twitter Search
        </Typography>
    </div>
  );
}
export default Logo;
