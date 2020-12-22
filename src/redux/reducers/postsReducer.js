import {postAPI} from "../../api/api";
import {CLEAR_POSTS, SEND_POST, SET_POSTS} from "./types";

const initialState = {
    posts: [],
}

function updateCommentRating(posts, postId, reply) {

    let temp = [...posts];

    (function func(temp) {

        for (let elem of temp) {
            if (elem["post_id"] == postId) {
                elem["responses"] = [...elem["responses"], reply]
            } else if (elem['responses']) {
                func(elem['responses']);
            }
        }

    })(temp);
    console.log('updated posts', temp)
    return temp;
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
            }
        case SEND_POST:
            return {
                ...state,
                posts: updateCommentRating(state.posts, action.parentId, action.post),
            }
        case CLEAR_POSTS:
            return {
                posts: [],
            }

        default:
            return state;
    }

}

export const sendPost = (post, parentId) => {
    return dispatch => {
        postAPI.sendPost(post)
            .then(post => dispatch({type: SEND_POST, post: post, parentId: parentId}))
    }
}

export const setPosts = (posts) => (dispatch) => {
    return dispatch({type: SET_POSTS, posts: posts})
}

export const clearPosts = () => (dispatch) => {
    return dispatch({type: CLEAR_POSTS})
}


