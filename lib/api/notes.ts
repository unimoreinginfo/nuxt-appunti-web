import client from './index'

export default {

    async get(query: string, page: number = 1){

        try{
            
            let response = await client.get(`/notes?page=${page}${query}`);
            return response.data.result;

        }catch(err){

            throw err;

        }

    },
    async getNote(id: string, subject_id: number){

        try{
            
            let response = await client.get(`/notes/${subject_id}/${id}?translate_subjects=true`);
            return response.data.result;

        }catch(err){

            throw err;

        }

    },
    async searchNotes(query: string, subject_id?: number){

        try{
            
            let response = await client.get(`/notes/search?q=${query}&subject_id=${subject_id}`);
            return response.data.result;

        }catch(err){

            throw err;

        }

    }

}