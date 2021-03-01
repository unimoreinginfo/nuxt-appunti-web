import client from './index';

export default {
    
    async user(){
    
        // client should be logged

        try{

            let response = await client.get('/auth/user', { withCredentials: true });

            return response.data.result;

        }catch(err){
            
            throw err;

        }

    },
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
    }
}