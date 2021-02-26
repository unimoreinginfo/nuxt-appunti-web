import client from './index';

const regexes = {
    password_regex: /.{8,}$/,
    email_regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
}


export default {
    validateInputs(email: string, password: string) {
        let isValid = {
            email: false,
            password: false
        }
        if(regexes.email_regex.test(email)) {
            isValid.email = true;
        }
        if(regexes.password_regex.test(password)) {
            isValid.password = true;
        }

        return isValid;
    },
    async signUp(email: string, password: string, name: string, surname: string, unimore_id: string) {
        try{
            
            let response = await client.post(`/auth/signup`, {
                email: email,
                password: password,
                name: name,
                surname: surname,
                unimore_id: unimore_id
            });

            return response.data.success;

        }catch(err){

            throw err;

        }
    },
    async logIn(email: string, password: string) {
        try{
            
            let response = await client.post(`/auth/login`, {
                email: email,
                password: password,
            });

            return {token: response.data.auth_token, refTokenExpiry: response.data.refresh_token_expiry};

        }catch(err){

            throw err;

        }
    }
}