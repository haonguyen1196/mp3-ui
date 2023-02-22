import axios from '../axios'

export const getHome = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/home',
            method: 'get',
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})

export const apiChart = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/chartHome',
            method: 'get',
        })
        resolve(response)
    } catch (err) {
        reject(err) 
    }
})