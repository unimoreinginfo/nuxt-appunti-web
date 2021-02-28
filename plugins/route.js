import client, { methods } from "../lib/api";

let route_auth = {
    "panel": true,
    "panel-admin": true,
    "panel-editNote-subject-id": true,
    "panel-editUser-id": true
}

export default({ app, store }) => {

    app.router.beforeEach(async(to, from, next) => {

        let token = localStorage.getItem("token");

        if (!token && route_auth[to.name]) return app.router.push(`/login?to=${to.path}`);
        store.commit('setAuth', token);

        try{
            
            let user = await methods.auth.user();
            store.commit('setUser', user);

            next();

        }catch(err){
            
            console.log(`client verification failed with code ${err}`);
            store.commit('notLogged', false);
            
            if (to.name != 'login' && route_auth[to.name])
                app.router.push(`/login?to=${to.path}`)
            
            next();

        }

    })

}
