import actionTypes from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    isAlbum: false,
    songs: null,
    curSongData: null,
    recentSong: [],
    searchData: {},
    keyword: '',
    searchPlaylist: null,
    scrollTop: true,
}

const musicReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.AT_ALBUM:
            return {
                ...state,
                isAlbum: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data
            }
        case actionTypes.SET_RECENT_SONG:
            let songs =state.recentSong
            if (action.data) {
                if(state.recentSong.some(item => item.encodeId === action.data.encodeId)) {
                }
                if(songs.length > 20) {
                   songs = songs.filter((i, index, self) => index !== self.length -1)
                }
                songs = [action.data, ...songs]
             }
            return {
                ...state,
                recentSong: songs,
            }
        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.keyword || ''
            }
        case actionTypes.SEARCH_PLAYLIST:
            return {
                ...state, 
                searchPlaylist: action.data || null,
            }
        default:
            return state
    }
}

export default musicReducer;    