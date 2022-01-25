const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var corsOptions = {

    origin: "http://localhost:8081"

}

const user ={
    id: 1,
    name: 'john doe',
    email: 'johndoe@gmail.com'
}

function generateAccessToken(user)
{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

function authenticateToken(req, res, next)
{
    const authHeader = res.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
    {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return res.sendStatus(401)
        }
        req.user = user;
        next();
    })
}

app.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
})


app.post("/api/login", (req, res) => {

    if ( req.body.email !== user.email ) {
        res.status(401).send({"error": "invalid credentials"})
        return
    }
    if ( req.body.password !== 'koala' ) {
        res.status(401).send({"error": "invalid credentials"})
        return
    }

    const accessToken = generateAccessToken(user);
    res.send({
        accessToken
    });
    
});

//require(".app/routes/tutorial.routes")(app);

require("./ship/ship.route")(app);
require("./tracker/tracker.route")(app);
require("./pairing_ship/pairing.route")(app);
require("./event/event.route")(app);
require("./category/category.route")(app);
require("./race/race.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});