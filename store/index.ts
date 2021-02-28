import client, { methods } from '@/lib/api';

export const state = () => ({
    auth: {
        token: null,
        is_logged: false
    },
    user: {} as any, // non mi va,
    uninitialized: true
})

export const getters = {
    getToken(s: any){
        return s.auth.token;
    },
    isLogged(s: any){
        return s.auth.is_logged;
    },
    getUser(s: any){
        return s.user;
    }
}
export const mutations = {

    setAuth(s: any, token: any){

        s.auth.token = token;
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        s.uninitialized = false;

    },
    setUser(s: any, user: any){

        s.user = user;
        s.auth.is_logged = true;

    },
    notLogged(s: any) {

        s.auth.token = null;
        s.auth.is_logged = false;
        localStorage.clear();

    }
}

export const actions = {
    async login({ commit }: any, data: any) {

        commit('setAuth', await methods.auth.login(data.email, data.password));
    
    }
}