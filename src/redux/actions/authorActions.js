import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import {beginApiCall} from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// this is a thunk
export function loadAuthors() {
  return function (dispatch) {
    dispatch((beginApiCall()));
    return authorApi
      .getAuthors()
      .then(authors => {     
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
}
