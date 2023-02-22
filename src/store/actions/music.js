import { apiArtist, apiListArtistSong, apiSearch } from "../../apis";
import actionTypes from "./actionTypes";

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid,
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
})

export const playAlbum = (flag) => ({
    type: actionTypes.AT_ALBUM,
    flag
})

export const setPlayList = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})

export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})

export const setRecentSong = (data) => ({
    type: actionTypes.SET_RECENT_SONG,
    data
})

export const setSearchData = (keyword) => async (dispatch) => {
    try {
        const response = await apiSearch(keyword)
        if(response.data.err === 0) {
            dispatch({type: actionTypes.SEARCH, data: response.data.data, keyword})
        } else {
            dispatch({type: actionTypes.SEARCH, data: null,})
        }
    } catch (error) {
        dispatch({type: actionTypes.SEARCH, data: null,})
    }
}

export const setArtistSong = (singerId) => async (dispatch) => {
    try {
        const response = await apiListArtistSong(singerId)
        if(response.data.err === 0) {
            dispatch({type: actionTypes.PLAYLIST, songs: response.data.data.items})
        } else {
            dispatch({type: actionTypes.PLAYLIST, songs: null,})
        }
    } catch (error) {
        dispatch({type: actionTypes.PLAYLIST, songs: null,})
    }
}

export const setArtist = (name) => async (dispatch) => {
    try {
        const response = await apiArtist(name)
        if(response.data.err === 0) {
            dispatch({type: actionTypes.SEARCH_PLAYLIST, data: response.data.data})
        } else {
            dispatch({type: actionTypes.SEARCH_PLAYLIST, data: null,})
        }
    } catch (error) {
        dispatch({type: actionTypes.SEARCH_PLAYLIST, searchPlaylist: null,})
    }
}


