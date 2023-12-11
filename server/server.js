const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(cors());

const apiDevice = require('./routes/Device');
app.use('/device', apiDevice);

const apiUser = require('./routes/Users');
app.use('/user', apiUser);

const apiActivity = require('./routes/Activitys');
app.use('/activity', apiActivity);

const apiImage = require('./routes/Images');
app.use('/image', apiImage);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 8080
db.sequelize.sync({ force: false }).then((req) => {
    app.listen(PORT, ()=>{
        console.log(`start server in port ${PORT}`);
    })
});