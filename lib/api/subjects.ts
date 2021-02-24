import client from './index'

export default {

    async getSubjects(){

        try{
            
            let response = await client.get('/subjects');
            return response.data.result;

        }catch(err){

            throw err;

        }

    }

}