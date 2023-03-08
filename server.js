const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

//TODO
app.get('/musicians', async (request, response) => {
    const foundMusicians = await Musician.findAll()
    response.json(foundMusicians)
})

//get request for musicians with specific id
app.get('/musicians/:id', async (request, response) => {
    const idMusicians = await Musician.findByPk(request.params.id)
    response.json(idMusicians)
})

//post request for adding musicians 
app.post('/musicians', async (request, response) => {
    const newMusician = await Musician.create(request.body)
    response.json(newMusician)
})

//put request for updating musician by id
app.put('/musician/:id', async (request, response) => {
    const foundMusician = await Musician.findByPk(request.params.id)
    await foundMusician.update({
        name: request.body.name,
        instrument: request.body.instrument
    })
    response.json(foundMusician)
})

//delete request for removing musician by id
    app.delete('/musician/:id', async (request, response) => {
        await Musician.destroy({
            where: {
                id: request.params.id
            }
        })
        response.send('Musician has been deleted!')
    })

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

