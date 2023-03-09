const express = require('express');
const router = express.Router();
const {Musician} = require("../Musician");
const {sequelize} = require("../db");

//TODO
router.get('/', async (request, response) => {
    const foundMusicians = await Musician.findAll()
    response.json(foundMusicians)
});

//get request for musicians with specific id
router.get('/:id', async (request, response) => {
    const idMusicians = await Musician.findByPk(request.params.id)
    response.json(idMusicians)
});

//post request for adding musicians 
router.post('/', async (request, response) => {
    const newMusician = await Musician.create(request.body)
    response.json(newMusician)
});

//put request for updating musician by id
router.put('/:id', async (request, response) => {
    const foundMusician = await Musician.findByPk(request.params.id)
    await foundMusician.update({
        name: request.body.name,
        instrument: request.body.instrument
    })
    response.json(foundMusician)
});

//delete request for removing musician by id
router.delete('/:id', async (request, response) => {
    await Musician.destroy({
        where: {
            id: request.params.id
        }
    })
    response.send('Musician has been deleted!')
});

module.exports = router;