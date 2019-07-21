import { combineReducers } from 'redux';
import { FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_LOADING, FETCH_COMMENTS_ERROR, CLEAR_COMMENTS_STATE } from './actions';

function comments(state = {}, action) {
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                videoComments: action.comments,
                nextPageToken: action.nextPageToken
            })
        case FETCH_COMMENTS_LOADING:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: undefined
            })
        case FETCH_COMMENTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                videoComments: undefined,
                nextPageToken: undefined,
                errorMessage: action.errorMessage
            })
        case CLEAR_COMMENTS_STATE:
            return Object.assign({}, state, {
                isFetching: false,
                videoComments: undefined,
                nextPageToken: undefined,
                errorMessage: undefined
            })
        default:
            return state
    }
}


const rootReducer = combineReducers({
    comments
})

export default rootReducer;