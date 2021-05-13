import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import autherService from './autherService'

export function getAuthorData({ id }) {
    return (dispatch) =>
        trackPromise(
            autherService.getAuthorData({ id })
            .then((response) => {
                const { data } = response;
                dispatch(setUserData(data))
                return data
            }).catch(error => {
                dispatch(setUserData([]))
            })
        )
}

export function getAuthorDetailsData({ id, view, order }) {
    return (dispatch) =>
        trackPromise(
            autherService.getAuthorDetailsData({ id, view, order })
            .then((response) => {
                const { data } = response;
                dispatch(setAuthorDetails(data))
                return data
            }).catch(error => {
                dispatch(setAuthorDetails([]))
            })
        )
}

export function getPostDetailsData({ id }) {
    return (dispatch) =>
        trackPromise(
            autherService.getPostDetailsData({ id })
            .then((response) => {
                const { data } = response;
                dispatch(setPostDetails(data))
                return data
            }).catch(error => {
                dispatch(setPostDetails([]))
            })
        )
}

export function getLikes({ id }) {
    return (dispatch) =>
        trackPromise(
            autherService.getLikes({ id })
            .then((response) => {
                const { data } = response;
                dispatch(setLikesData(data))
                return data
            }).catch(error => {
                dispatch(setLikesData([]))
            })
        )
}

export function getComments({ id }) {
    return (dispatch) =>
        trackPromise(
            autherService.getComments({ id })
            .then((response) => {
                const { data } = response;
                dispatch(setCommentsData(data))
                return data
            }).catch(error => {
                dispatch(setCommentsData([]))
            })
        )
}

export const slice = createSlice({
    name: 'autherPost',
    initialState: {
        userData: [],
        commentData: [],
        authorDetailsData: [],
        postDetailsData: [],
        likeData: [],
        fetchStatus: false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.fetchStatus = false;
        },
        setAuthorDetails: (state, action) => {
            state.authorDetailsData = action.payload;
            state.fetchStatus = true;
        },
        setPostDetails: (state, action) => {
            state.postDetailsData = action.payload;
        },
        setCommentsData: (state, action) => {
            state.commentData = action.payload;
        },
        setLikesData: (state, action) => {
            state.likeData = action.payload;
        }
    },
    extraReducers: {}
});

export const { setResetAuthorDetails, setLikesData, setPostDetails, setUserData, setAuthorDetails, setCommentsData } = slice.actions;

export default slice.reducer;
