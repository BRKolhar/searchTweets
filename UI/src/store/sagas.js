import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_API_FILTER,REQUEST_API_TRENDING_TWEETS, receiveApiDataFilter, receiveApiTrendingTweets } from "../layout/actions";
import { fetchData, trendingTweets } from "./api";

// worker Saga: will be fired on REQUEST_API_FILTER actions
function* getApiData(action) {
  try {
    // do api call
    const tweetList = yield call(fetchData);
    //const {data} = tweetList;
    yield put(receiveApiDataFilter(tweetList));
  } catch (e) {
    console.log(e);
  }
}

// worker Saga: will be fired on REQUEST_API_TRENDING_TWEETS actions
function* getTrendingTweets(action) {
  try {
    // do api call
    const tweets = yield call(trendingTweets);
    yield put(receiveApiTrendingTweets(tweets));
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_FILTER, getApiData);
  yield takeLatest(REQUEST_API_TRENDING_TWEETS, getTrendingTweets);
}
