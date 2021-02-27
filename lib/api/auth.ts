import client from './index';

export default {
    
    async signup(email: string, password: string, name: string, surname: string, unimore_id: string) {
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
    async login(email: string, password: string) {
        try{
            
            let response = await client.post(`/auth/login`, {
                email: email,
                password: password,
            });

            return response.data.auth_token;

        }catch(err){

            throw err;

        }
    }
}