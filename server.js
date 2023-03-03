const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get('/musicians', async (request, response) => {
    const foundMusicians = await Musician.findAll()
    response.json(foundMusicians)
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})