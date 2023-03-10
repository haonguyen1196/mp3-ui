import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from 'redux-persist/lib/storage'

import appReducer from "./appReducer";
import musicReducer from "./musicReducer";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId', 'curSongData', 'recentSong'],
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer)
})

export default rootReducer;