const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '9619a14c1ead43c88c6f52ca4bbcd0d0',
        clientSecret: 'dd168265dccf4e6c8fa8d3005aae7702',
        refreshToken,
    });

    spotifyApi.refreshAccessToken().then(
        data => {
            res.json({accessToken: data.body.access_token,
            expiresIn: data.body.expiresIn
        })
        }).catch(() => {
            console.log(err)
            res.sendStatus(400)
        })

})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '9619a14c1ead43c88c6f52ca4bbcd0d0',
        clientSecret: 'dd168265dccf4e6c8fa8d3005aae7702'
    });
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }).catch(err => {
        console.log(err)
        res.sendStatus(400);
    });
});

app.listen(3001);