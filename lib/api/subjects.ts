import client from './index'

export default {

    async getSubject(id: number){

        try{
            
            let response = await client.get(`/subjects/${id}`);
            return response.data.result;

        }catch(err){

            throw err;

        }

    },

    async getSubjects(){

        try{
            
            let response = await client.get('/subjects');
            return response.data.result;

        }catch(err){

            throw err;

        }

    }

}