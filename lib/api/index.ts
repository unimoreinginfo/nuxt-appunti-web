import axios from 'axios';
import subjects from './subjects';
import notes from './notes';
import users from './users';
import auth from './auth';

// public api stuff

const client = axios.create({
    baseURL: 'https://api.appunti.me'
});

export default client;

export const methods = {

    subjects, notes, users, auth,
    async bridgeCookies(auth_token: string, ref_token: string){

        try{

            let uri = ((process.env.NODE_ENV === 'production') ? process.env.URI : 'http://localhost:3000');

            await axios.post(`${uri}/bridge/cookies`, { token: auth_token, ref_token })
            return true;
        
        }catch(err){

            console.log(err);
            throw err;

        }

    },
    async clearCookies(){

        try{

            await axios.post(`/bridge/logout`)
            return true;
        
        }catch(err){

            console.log(err);
            throw err;

        }

    }

}