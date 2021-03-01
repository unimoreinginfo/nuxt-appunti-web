import client from '../lib/api';

export default async function (context) {
    
    if(!process.server)
        return;

    let { route, req, store, redirect, app } = context;
    let route_redirect = route.path, route_name = route.name;
    let cookies = req.headers.cookie;
    
    if(!cookies){

        store.commit('notLogged');
        if(store.getters.getSecuredRoutes[route_name])
            return redirect(`/login?to=${encodeURI(route_redirect)}`);
        else return;

    }

    let auth_token = getCookie(cookies, 'token'),
        ref_token = getCookie(cookies, 'ref_token');

    if(!auth_token || !ref_token){

        store.commit('notLogged');
        if (store.getters.getSecuredRoutes[route_name])
            return redirect(`/login?to=${encodeURI(route_redirect)}`);
        
        return;
    }

    try{

        let response = await client.get('/auth/user', {
            headers: {
                "Authorization": `Bearer ${auth_token.split("token=")[1]}`,
                "Cookie": ref_token
            }
        })

        console.log(`client successfully verified, hello ${response.data.result.name}`);
        // filliamo il client ora
        store.commit('setAuth', { auth_token: auth_token.split("token=")[1], ref_token: ref_token.split("ref_token=")[1] })
        store.commit('setUser', response.data.result);

        if(route.name == 'login')
            return redirect('/panel')

    }catch(err){

        console.log(`client verification failed, bailing middleware and redirecting`);
        store.commit('notLogged');
        app.$cookies.removeAll();
        redirect(`/login?to=${encodeURI(route_redirect)}`)

    }

}

function getCookie(str, key){
    return str.split(';').find(c => c.trim().startsWith(`${key}`))
}