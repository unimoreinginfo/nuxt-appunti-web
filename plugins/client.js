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
    user: {
        async size(){
            try {

                let response = await client.get('/users/size');
                return response.data;

            } catch (err) {

                throw err;

            }
        }
    },
    notes: {
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

        }
    }
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
