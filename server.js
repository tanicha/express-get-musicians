const express = require("express");
const app = express();
const {sequelize} = require("./db");
const musiciansRouter = require('./routers/musicians');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/musicians', musiciansRouter);

app.listen(port, () => {
    sequelize.sync()
    console.log(`Listening on port ${port}`)
});

