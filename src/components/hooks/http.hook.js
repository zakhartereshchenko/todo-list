import axios from 'axios'

const SERVER_URL = 'http://localhost:3001/'

const API = axios.create({
    baseURL: SERVER_URL,
})

export default API