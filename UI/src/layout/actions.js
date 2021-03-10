export const REQUEST_API_FILTER = "REQUEST_API_FILTER";
export const RECEIVE_API_FILTER = "RECEIVE_API_FILTER";
export const REQUEST_API_TRENDING_TWEETS = "REQUEST_API_TRENDING_TWEETS";
export const RECEIVE_API_TRENDING_TWEETS = "RECEIVE_API_TRENDING_TWEETS";

export const requestApiDataFilter = () => ({ type: REQUEST_API_FILTER });
export const receiveApiDataFilter = data => ({ type: RECEIVE_API_FILTER, data });

export const requestApiTrendingTweets = () => ({ type: REQUEST_API_TRENDING_TWEETS });
export const receiveApiTrendingTweets = data => ({ type: RECEIVE_API_TRENDING_TWEETS, data });
