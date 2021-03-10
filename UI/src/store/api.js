import axios from 'axios';
export const fetchData = async () => {
  try {
    let filterValue = localStorage.getItem("filterValue") ? localStorage.getItem("filterValue") : '[]'
    !filterValue && (filterValue = [])
    // POST request using fetch with set headers
    const requestOptions = {
      "method": "POST",
      "url": "http://localhost:8000/graphQL",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "data": {
              "query": `{\n\n  tweets(searchString: ${filterValue}) {\n    id\n    text\n    public_metrics{\n      like_count\n      reply_count\n      quote_count\n      retweet_count\n    }\n    createdAt\n    updatedAt\n    source\n  }\n}\n`
              }
    };
    const response = await axios(requestOptions);
    const {data} = await response;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const trendingTweets = async () => {
  try {
    // POST request using fetch with set headers
    const requestOptions = {
      "method": "POST",
      "url": "http://localhost:8000/graphQL",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "data": {
              "query": "{\n\n  \n  trendingTweets(weoid: \"23424848\") {\n    trends {\n      url\n      name\n      query\n      tweet_volume\n      promoted_content\n    }\n  }\n}\n"
              }
    };
    const response = await axios(requestOptions);
    const {data} = await response;
    return data;
  } catch (e) {
    console.log(e);
  }
};