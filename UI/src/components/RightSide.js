import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import logo from './twitter.png';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiTrendingTweets } from "../layout/actions";

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
  mainContant:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flexDirection: 'column',
    padding: '0px !important',
    maxWidth: '100%'
  },
  mainCounters:{
    flex:'1 1 auto',
    textAlign:'center',
    margin:'5px',
    justifyContent:'space-around',
    display: 'flex',
    padding: '0px !important',
  },
  url:{
    textAlign: 'left',
    wordBreak: 'break-all',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical'
  }
}));

function RightSide(props) {
  const classes = useStyles();
  useEffect(()=>{
    props.requestApiTrendingTweets();
  }, [])
  let {data} = props;
 let result = data.trendingTweets != null ? data.trendingTweets.trends : null
 let tweets = (x, i) =>
 <Paper className={classes.paper} key={i}>
 <Grid container spacing={2}>
   <Grid item>
     <ButtonBase className={classes.image}>
       <img className={classes.img}  src={logo} alt='twitter' />
     </ButtonBase>
   </Grid>
   <Grid item xs={8} sm container>
     <Grid item xs container direction="column" spacing={2}>
       <Grid item xs className={classes.mainContant}>
         <Typography gutterBottom variant="h5" style={{textAlign:'left', wordBreak: 'break-all'}}>
         {x.name} 
         </Typography>
         <Typography variant="body2" className={classes.url} title={x.url} gutterBottom style={{textAlign:'left', wordBreak: 'break-all'}}>
            <a href={x.url} target="_blank">{x.url}</a>
         </Typography>
       </Grid>
       {/* <Grid item className={classes.mainCounters}>
         <Typography variant="body2" style={{ cursor: 'pointer' }}>
           {x.public_metrics.reply_count}<TextsmsIcon />
         </Typography>
         <Typography variant="body2" style={{ cursor: 'pointer' }}>
         {x.public_metrics.like_count}<FavoriteBorderIcon />
         </Typography>
         <Typography variant="body2" style={{ cursor: 'pointer' }}>
         {x.public_metrics.retweet_count}<RepeatIcon />
         </Typography>
       </Grid> */}
     </Grid>
   </Grid>
 </Grid>
</Paper>;
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5" style={{textAlign:'center', wordBreak: 'break-all'}}>
        Trending Tweets 
      </Typography>
    {      result != null    ? <h1>
          {result.map(tweets)}
        </h1>
      : <h1>loading...</h1>}
    </div>
  );
}

const mapStateToProps = state => ({ data: state.data, ...state });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiTrendingTweets }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);