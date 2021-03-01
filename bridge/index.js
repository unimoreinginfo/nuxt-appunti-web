const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = require('express')()

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/cookies', (req, res) => {
    
    res.cookie('token', req.body.token, { 
        path: '/', 
        maxAge: 31536000, 
        httpOnly: true 
    });
    res.cookie('ref_token', req.body.ref_token, { 
        path: '/', 
        maxAge: 31536000, 
        httpOnly: true 
    });
    return res.json(true);

})

app.post('/logout', (req, res) => {

    res.clearCookie('token');
    res.clearCookie('ref_token')
    return res.json(true);

})

module.exports = app;