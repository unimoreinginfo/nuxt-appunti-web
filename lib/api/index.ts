import axios, { AxiosInstance } from 'axios';
import subjects from './subjects';
import notes from './notes';
import users from './users';
import auth from './auth';

export default axios.create({
    baseURL: 'https://api.appunti.me'
})

export const methods = {

    subjects, notes, users, auth

}