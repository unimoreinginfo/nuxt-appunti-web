import client, { methods } from '@/lib/api';

export const state = () => ({
    auth: {
        token: null,
        is_logged: false
    }
})

export const getters = {
    getToken(s: any){
        return s.auth.token;
    },
    isLogged(s: any){
        return s.auth.is_logged;
    }
}
export const mutations = {
    setAuth(s: any, token: any){
        s.auth.token = token;
        s.auth.is_logged = true;
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    notLogged(s: any) {
        s.auth.token = null;
        s.auth.is_logged = false;
    }
}

export const actions = {
    async login({ commit }: any, data: any) {

        commit('setAuth', await methods.auth.login(data.email, data.password));
    
    }
}