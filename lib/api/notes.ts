import client from './index'

export default {

    async get(query: string, page: number = 1, returnPageNumber: boolean = false){

        try{
            
            let response = await client.get(`/notes?page=${page}${query}`);
            return returnPageNumber ? response.data : response.data.result;

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
    async searchNotes(query: string, subject_id?: number, author_id?: string, page: number = 1, returnPageNumber: boolean=false){

        try{
            
            console.log(author_id);
            
            let response = await client.get(`/notes/search?q=${query}&subject_id=${subject_id ? subject_id : 'any'}&author_id=${author_id || ""}&page=${page}`);
            return returnPageNumber ? response.data : response.data.result;

        }catch(err){

            throw err;

        }

    }

}