import axios from '../axios'

export const apiGetSong = (sid) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiGetDetailSong = (sid) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiGetDetailPlaylist = (pid) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/detailplaylist',
            method: 'get',
            params: {id: pid}
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiSearch = (keyword) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/search',
            method: 'get',
            params: {keyword}
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiListArtistSong = (singerId) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/artistsong',
            method: 'get',
            params: {
                id: singerId,
                page: '1',
                count: '50'
            }
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiArtist = (name) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/artist',
            method: 'get',
            params: {
                name
            }
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})