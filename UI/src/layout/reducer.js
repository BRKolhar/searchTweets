import { RECEIVE_API_FILTER, RECEIVE_API_TRENDING_TWEETS } from "./actions";
let defultValue = {
    tweets: null,
    trendingTweets: null
}

export default (state = defultValue, action) => {
  switch (action.type) {
    case RECEIVE_API_FILTER:
    return {
      ...state,
      tweets: action.data.data.tweets,      
    }
    case RECEIVE_API_TRENDING_TWEETS:
    return {
      ...state,
      trendingTweets: action.data.data.trendingTweets[0]
    }
    default:
      return state;
  }
};
