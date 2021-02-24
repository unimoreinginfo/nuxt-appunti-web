import axios, { AxiosInstance } from 'axios';
import subjects from './subjects';
import notes from './notes';

export default axios.create({
    baseURL: 'https://api.appunti.me'
})

export const methods = {

    subjects, notes

}