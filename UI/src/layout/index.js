import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import Main from '../components/Main';
import RightSide from '../components/RightSide';
import Logo from '../components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
  },
  header:{
    display: 'flex',
    justifyContent: 'left',
    padding: '30px 0px 0px 0px',
  },
  container:{
    width: '100% !important',
  },
  rightSide: {
    height: '475px',
    justifyContent: 'space-around',
   overflowY: 'scroll',
   '&::-webkit-scrollbar': {
      width: '12px'
   },
   '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    borderRadius: '10px'
 }
  }
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={12}>
          <Paper className={`${classes.paper} ${classes.header}`}>
              <Logo />
              <Header />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} >
              <Main data={props} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={`${classes.paper} ${classes.rightSide}`}>
            <RightSide />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
