import client, { methods } from '@/lib/api';

export const state = () => ({
    auth: {
        token: null
    }
})

export const getters = {
    getToken: (s: any) => {
        return s.auth.token;
    }
}
export const mutations = {
    setAuth: (s: any, token: any) => {
        s.auth.token = token;
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export const actions = {
    async login({ commit }: any, data: any) {

        commit('setAuth', await methods.auth.login(data.email, data.password));
    
    }
}