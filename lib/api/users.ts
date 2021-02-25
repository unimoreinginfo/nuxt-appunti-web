import client from './index'

export default {

    async get(id: string){

        try{

            let response = await client.get(`/users/${id}`);
            return response.data.result;

        }catch(err){

            console.log(err);
            throw err;

        }

    }

}