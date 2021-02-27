import client from "../lib/api";

let token_set = false;
let route_auth = {
    "index": true
}

export default({ app }) => {

    app.router.beforeEach(async(to, from, next) => {

        if(!route_auth[to.name])
            return next();

        let token = localStorage.getItem("token");

        if(!token)
            return app.router.push('/login');

        if(!token_set){
            console.log("setting token");
            client.defaults["headers"]["Authorization"] = `Bearer ${window.localStorage.getItem("token")}`;
            token_set = true;
        }

        try{

            await client.get('/auth/user');
            next();

        }catch(err){

            app.router.push('/login')

        }

    })

}