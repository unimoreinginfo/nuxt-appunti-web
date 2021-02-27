import client from "../lib/api";

let token_set = false;
let route_auth = {
    "panel-admin": true,
    "panel-editNote-subject-id": true,
    "panel-editUser-id": true
}

export default({ app, store }) => {

    app.router.beforeEach(async(to, from, next) => {
        console.log(to.name);
        if(!route_auth[to.name])
            return next();

        let token = localStorage.getItem("token");

        if(!token)
            return app.router.push(`/login?to=${to.path}`);

        if(!token_set){
            console.log("setting token");
            store.commit('setAuth', token);
            token_set = true;
        }

        try{

            await client.get('/auth/user');
            next();

        }catch(err){

            app.router.push(`/login?to=${to.path}`)

        }

    })

}
