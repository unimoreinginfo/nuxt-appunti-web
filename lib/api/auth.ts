import client from './index';

export default {
    
    async signUp(email: string, password: string, name: string, surname: string, unimore_id: string) {
        try{
            
            let response = await client.post(`/auth/signup`, {
                email: email,
                password: password,
                name: name,
                surname: surname,
                unimore_id: unimore_id
            });

            return response.data.success;

        }catch(err){

            throw err;

        }
    },
    async logIn(email: string, password: string) {
        try{
            
            let response = await client.post(`/auth/login`, {
                email: email,
                password: password,
            });

            return {token: response.data.auth_token, refTokenExpiry: response.data.refresh_token_expiry};

        }catch(err){

            throw err;

        }
    }
}