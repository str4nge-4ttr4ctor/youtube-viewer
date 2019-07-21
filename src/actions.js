import { API_KEY } from './App.js'

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_LOADING = 'FETCH_COMMENTS_LOADING';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

var axios = require('axios');

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/commentThreads';

export function fetchComments(dispatch, videoId, nextPageToken, videoComments) {
    var comments;
    dispatch({ type: FETCH_COMMENTS_LOADING });
    const params = {
        key: API_KEY,
        part: "snippet",
        videoId: videoId,
        maxResults: 10,
        pageToken: nextPageToken
    };
    axios.get(ROOT_URL, { params: params })
        .then(function (response) {
            comments = videoComments
                ? videoComments.concat(response.data.items)
                : response.data.items;
            dispatch({ type: FETCH_COMMENTS_SUCCESS, comments: comments, nextPageToken: response.data.nextPageToken });
        })
        .catch(function (error) {
            console.error(error);
            dispatch({ type: FETCH_COMMENTS_ERROR, errorMessage: "An error occured. Please try again later." });
        });
}


export const CLEAR_COMMENTS_STATE = 'CLEAR_COMMENTS_STATE';

export function clearCommentsState() {
    return { type: CLEAR_COMMENTS_STATE };
}