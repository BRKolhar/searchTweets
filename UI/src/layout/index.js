import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import Main from '../components/Main';
import RightSide from '../components/RightSide';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiData } from "./actions";

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
    justifyContent: 'center',
    padding: '30px 0px 0px 0px',
  },
  container:{
    width: '100% !important',
  }
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={12}>
          <Paper className={`${classes.paper} ${classes.header}`}>
              <Header />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} >
              <Main data={props} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <RightSide />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
