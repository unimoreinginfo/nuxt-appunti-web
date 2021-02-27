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

    },

    async getPage(page: number, returnPageNumber: boolean = false){
        console.log(client.defaults.headers.common);
        try{
            let response = await client.get(`/users?page=${page}`);
            return returnPageNumber ? {pages: response.data.pages, result: response.data.result} : response.data.result;
            return response.data.result;

        }catch(err){
            console.log(err);
            throw err;

        }

    }

}