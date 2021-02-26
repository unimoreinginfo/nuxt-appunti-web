import commit from 'vuex';
import auth from '@/lib/api/auth';

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
    async logIn({ commit }, data: any) {
        commit('setAuth', auth.logIn(data.email, data.password));
        console.log("action");
    }
}