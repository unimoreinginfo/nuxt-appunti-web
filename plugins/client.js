import axios from 'axios';
let client = axios.create({
    baseURL: 'https://api.appunti.me',
    withCredentials: true
})

let methods = {
    // api privata, da usare nei componenti
    auth: {
        async token(client_token){
            try{

                let response = await client.get(`/auth/token/${client_token}`);
                // return response.data.
                
            }catch(err){

                throw err;

            }
        },
        async login(email, password) {
            try {

                let response = await client.post(`/auth/login`, {
                    email: email,
                    password: password,
                }, { withCredentials: true });
                
                return { ...response.data };

            } catch (err) {

                throw err;

            }
        }
    },
    users: {
        async get(id){

            try{
    
                let response = await client.get(`/users/${id}`);
                return response.data.result;
    
            }catch(err){
    
                console.log(err);
                throw err;
    
            }
    
        },
        async size(){
            try {

                let response = await client.get('/users/size');
                return response.data;

            } catch (err) {

                throw err;

            }
        },
        async edit(id, name, surname, unimore_id) {
            try {
                await client.post(`/users/${id}`, {
                    name: name,
                    surname: surname,
                    unimore_id: unimore_id
                });

            } catch(err) {
                throw err;
            }
        },
        async delete(id) {
            // SOLO PER ADMIN
            try {
                await client.delete(`/users/${id}`);
    
            } catch(err) {
                throw err;
            }
        },
        async getPage(page, returnPageNumber) {

            try {

                let users = await client.get(`/users?page=${page}`);
                return returnPageNumber ? users.data : users.data.result;

            } catch (err) {

                throw err;

            }

        },
        async editPassword(id, old_password, new_password) {
            try {
                await client.post(`/users/${id}/password`, {
                    old_password: old_password,
                    new_password: new_password
                });

            } catch(err) {
                throw err;
            }
        }

    },
    notes: {
        async getNote(id, subject_id) {

            try {

                let response = await client.get(`/notes/${subject_id}/${id}`);
                return response.data.result;

            } catch (err) {

                throw err;

            }
        },
        async upload(data){

            try {

                await client.post(`/notes`, data);

            } catch (err) {

                throw err;
                
            }

        },
        async edit(oldSub, id, newSub, newTitle) {
            try {
                    await client.post(`/notes/${oldSub}/${id}`, {
                    title: newTitle,
                    new_subject_id: newSub
                });

            } catch(err) {
                throw err;
            }
        },
        async get(query, page = 1, returnPageNumber = false) {

            try {

                let response = await client.get(`/notes?page=${page}${query}`);
                return returnPageNumber ? response.data : response.data.result;

            } catch (err) {

                throw err;

            }

        },
        async delete(sub, id) {
            try {
                await client.delete(`/notes/${sub}/${id}`);
    
            } catch(err) {
                throw err;
            }
        }    
    },
    webhooks: {
        notes: {
            async create(title, url) {
                
                let response = await client.post('/webhooks/notes/register/', {webhook_title:title, webhook_url:url})
                return response.data
            },
            async list() {
                let response = await client.get('/webhooks/notes')
                return response.data
            } 
        }
    },
}

export default({ app, store }, inject) => {

    /* 

        questo plugin prende semplicemente la roba che viene messa nello store dal middleware (autenticazione)
        e la injecta nelle pagine in modo tale che si possa fare un client di axios riutilizzabile

        questo è possibile perché QUESTO client vive sul browser

    */

    client.defaults.headers.common["Authorization"] = `Bearer ${store.getters.getToken}`
    inject('api', { client, methods });

}
