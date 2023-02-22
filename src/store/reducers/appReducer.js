import actionTypes from '../actions/actionTypes';

const initState = {
    banner: null,
    friday: null,
    newSong: null,
    top100: null,
    xone: null,
    newMusic: null,
    newRelease: null,
    weekChart: null,
    trendArtist: null,
    chart: null,
    rank: null,
    singer: null,
}

const appReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find(item => item.sectionId === 'hAutoTheme1') || null,
                newSong: action.homeData?.find(item => item.sectionId === 'hAutoTheme2') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                xone: action.homeData?.find(item => item.sectionId === 'hXone') || {},
                newMusic: {...action.homeData?.find(item => item.sectionId === 'hAlbum'), title: "Nhạc mới"} || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart').items || [],
                trendArtist: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                chart: action.homeData?.find(item => item.sectionId === 'hZC').chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC').items || [],
                singer: action.homeData?.find(item => item.sectionType === 'artistSpotlight').items || null,
            }
        default:
            return state
    }
}

export default appReducer;