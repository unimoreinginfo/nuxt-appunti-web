import { methods } from '@/lib/api';

export const state = () => ({
    auth: {
        token: null,
        refTokenExpiry: null
    }
})

export const getters = {
    getRefTokenExpiry: (s: any) => {
        return s.auth.refTokenExpiry;
    },
    getToken: (s: any) => {
        return s.auth.token;
    }
}
export const mutations = {
    setAuth: (s: any, token: any) => {
        s.auth = token;
        console.log("mutation");
    }
}

export const actions = {
    async logIn({ commit }: any, data: any) {
        commit('setAuth', methods.auth.logIn(data.email, data.password));
    }
}