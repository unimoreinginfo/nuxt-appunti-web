import axios from 'axios';
import subjects from './subjects';
import notes from './notes';
import users from './users';
import auth from './auth';

const client = axios.create({
    baseURL: 'https://api.appunti.me',
    withCredentials: true
});

export default client;

export const methods = {

    subjects, notes, users, auth

}