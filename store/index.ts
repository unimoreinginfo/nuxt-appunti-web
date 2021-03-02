export const state = () => ({
    auth: {
        token: null,
        ref_token: null,
        is_logged: false
    },
    user: {} as any, // non mi va,
    uninitialized: true
})

export const getters = {
    getToken(s: any){
        return s.auth.token;
    },
    getRefToken(s: any){
        return s.auth.ref_token;
    },
    isLogged(s: any){
        return s.auth.is_logged;
    },
    getUser(s: any){
        return s.user;
    },
    getSecuredRoutes(s: any){
        return s.secured_routes;
    }
}
export const mutations = {

    setUser(s: any, user: any){

        s.user = user;
        s.auth.is_logged = true;

    },
    notLogged(s: any) {

        s.user = null;
        s.auth.is_logged = false;
        s.auth.token = null;
        s.auth.ref_token = null;

    },
    setAuth(s: any, data: any){

        s.auth.token = data.auth_token;
        s.auth.ref_token = data.ref_token; // ci serve sta roba sul client

    }
}