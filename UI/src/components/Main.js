import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import logo from './twitter.png';
import RepeatIcon from '@material-ui/icons/Repeat';
import TextsmsIcon from '@material-ui/icons/Textsms';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiDataFilter } from "../layout/actions";
import Image_noTweetsWereFound from "./Image_noTweetsWereFound.jpeg"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '1rem',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  mainContant: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flexDirection: 'column',
    padding: '0px !important',
  },
  mainCounters: {
    flex: '1 1 auto',
    textAlign: 'center',
    margin: '5px',
    justifyContent: 'space-between',
    display: 'flex',
    padding: '0px !important',
  }
}));

function Main(props) {
  const classes = useStyles();
  useEffect(() => {
    localStorage.setItem("filterValue", JSON.stringify([]));
    props.requestApiDataFilter();
  }, [])
  let { data } = props;
  let result = data.tweets != null ? data.tweets : null
  let tweets = (x, i) =>
    <Paper className={classes.paper} key={i}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} src={logo} alt='twitter' />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs className={classes.mainContant}>
              <Typography gutterBottom variant="h5">
                {x.source}
              </Typography>
              <Typography variant="body2" gutterBottom style={{ textAlign: 'left' }}>
                {x.text}
              </Typography>
            </Grid>
            <Grid item className={classes.mainCounters}>
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                {x.public_metrics.reply_count}<TextsmsIcon />
              </Typography>
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                {x.public_metrics.like_count}<FavoriteBorderIcon />
              </Typography>
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                {x.public_metrics.retweet_count}<RepeatIcon />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  return (
    <div className={classes.root}>
      {      result != null ? <h1>
        {result.map(tweets)}
      </h1>
        : <h1>loading...</h1>
      }
      { (result && result.length > 0) ? '' : <img width='70%'  src={Image_noTweetsWereFound} alt='twitter' />}
    </div>

  );
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiDataFilter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);