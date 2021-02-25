import axios, { AxiosInstance } from 'axios';
import subjects from './subjects';
import notes from './notes';
import users from './users';

export default axios.create({
    baseURL: 'https://api.appunti.me'
})

export const methods = {

    subjects, notes, users

}