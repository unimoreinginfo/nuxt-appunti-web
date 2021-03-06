import client, { methods } from '../lib/api';

export default async function (context) {
    
    if(!process.server)
        return;

    let { route, req, store, redirect, app, res } = context;
    let route_redirect = route.path, route_name = route.name;
    let cookies = req.headers.cookie;
    let panel = route_redirect.split("/panel").length;

    if(panel > 1)
        store.commit('inPanel', true)
    else
        store.commit('inPanel', false)
    
    if(!cookies){

        store.commit('notLogged');
        if(panel > 1)
            return redirect(`/login?to=${encodeURI(route_redirect)}`);
        else return;

    }

    let auth_token = getCookie(cookies, 'token'),
        ref_token = getCookie(cookies, 'ref_token');

    if(!auth_token || !ref_token){

        store.commit('notLogged');
        if (panel)
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

        if(route_name == 'login')
            return redirect('/panel')

    }catch(err){

        console.log(`client verification failed`);

        if (err.response.status === 401 && Object.prototype.hasOwnProperty.call(err.response.data, "auth_token")){

            console.log(`auth token expired, session can be recovered!`);
            
            app.$cookies.setAll([
                {
                    name: 'token',
                    value: err.response.data["auth_token"],
                    path: '/',
                    maxAge: 31536000,
                    httpOnly: true
                },
                {
                    name: 'ref_token',
                    value: ref_token.split("ref_token=")[1],
                    path: '/',
                    maxAge: 31536000,
                    httpOnly: true
                }
            ])

            store.commit('setAuth', { auth_token: err.response.data["auth_token"], ref_token: ref_token.split("ref_token=")[1] })
            store.commit('setUser', err.response.data["user"])

        }else{

            console.log(`session is unrecoverable, bailing middleware`);
            store.commit('notLogged');
            app.$cookies.removeAll();
            redirect(`/login?to=${encodeURI(route_redirect)}`)

        }

    }

}

function getCookie(str, key){
    return str.split(';').find(c => c.trim().startsWith(`${key}`))
}