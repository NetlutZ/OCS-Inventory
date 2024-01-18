const express = require('express');
const cors = require('cors');
const db = require('./models');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: [`http://localhost:3000`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 30,
        // expires: new Date(Date.now() + 10000),
    },
}));

app.get('/active-sessions', (req, res) => {
    const activeSessions = req.sessionStore.sessions;
  
    // Now activeSessions is an object containing all active sessions
    res.json(activeSessions);
  });

const apiDevice = require('./routes/Device');
app.use('/device', apiDevice);

const apiUser = require('./routes/Users');
app.use('/user', apiUser);

const apiActivity = require('./routes/Activitys');
app.use('/activity', apiActivity);

const apiImage = require('./routes/Images');
app.use('/image', apiImage);

const apiRfid = require('./routes/Rfid');
app.use('/rfid', apiRfid);

app.get('/', (req, res) => {
    if (req.session.username) {
        res.send({ loggedIn: true, username: req.session.username });
    } else {
        res.send({ loggedIn: false });
    }
});


const { Users } = require('./models');
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                username,
            },
        });

        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                req.session.username = user.username;
                res.send({ Login: true });
            } else {
                res.send({ Login: false, error: 'Wrong password' });
            }
        } else {
            res.send({ Login: false, error: 'User not found' });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.get('/logout', (req, res) => {
    if (req.session.username) {
        req.session.destroy();
        res.send({ Logout: true });
    } else {
        res.send({ Logout: false });
    }
});

const PORT = process.env.PORT || 8080
db.sequelize.sync({ force: false }).then((req) => {
    app.listen(PORT, () => {
        console.log(`start server in port ${PORT}`);
    })
});