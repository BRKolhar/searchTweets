import { RECEIVE_API_DATA } from "./actions";
let defultValue = {
    data: null
}

export default (state = defultValue, { type, data }) => {
  switch (type) {
    case RECEIVE_API_DATA:
      return data;
    default:
      return state;
  }
};
