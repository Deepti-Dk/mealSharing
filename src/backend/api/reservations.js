const express = require('express');
const router = express.Router();
const knex = require('../database');
/************************************************************ */
/**************         Reservations-APIs      ***************/
/********************************************************** */

//api/reservations/	GET	Returns all reservations	GET api/reservations/
router.get('/', async (request, response) => {
  try {
    const allReservations = await knex('reservation').select('*');
    response.json(allReservations);
  } catch (error) {
    throw error;
  }
});

// api/reservations/	POST	Adds a new reservation	POST api/reservations/
const createReservation = async ({ body }) => {
  const {
    id,
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = body;
  return await knex('reservation').insert({
    id: id,
    number_of_guests: number_of_guests,
    meal_id: meal_id,
    created_date: created_date,
    contact_phonenumber: contact_phonenumber,
    contact_name: contact_name,
    contact_email: contact_email,
  });
};
router.post('/', async (request, response) => {
  createReservation({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send('Bad request').end();
      console.log(error);
    });
});

// api/reservations/{id}	GET	Returns reservation by id	GET api/reservations/2
router.get('/:id', async (request, response) => {
  try {
    const specificReservation = await knex('reservation')
      .select('*')
      .where({
        id: parseInt(request.params.id),
      });
    response.json(specificReservation);
  } catch (error) {
    throw error;
  }
});

// api/reservations/{id}	PUT	Updates the reservation by id	PUT api/reservations/2
const editReservation = async ({ body, id }) => {
  const {
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = body;
  const reservation = await knex.from('reservation').select('*').where({
    id: id,
  });
  if (reservation.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  const queryDto = {
    id,
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  };

  if (Object.keys(queryDto).length !== 0) {
    return await knex('reservation')
      .where({
        id: id,
      })
      .update(queryDto);
  } else return 'Nothing updated!';
};

router.put('/:id', async (req, res) => {
  editReservation({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

// api/reservations/{id}	DELETE	Deletes the reservation by id	DELETE api/reservations/2
const deleteReservation = async ({ id }) => {
  const reservation = await knex.from('reservation').select('*').where({
    id: id,
  });
  if (reservation.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  if (Object.keys(reservation).length !== 0) {
    return await knex('reservation')
      .where({
        id: id,
      })
      .delete(reservation);
  } else return 'Nothing updated!';
};

router.delete('/:id', async (req, res) => {
  deleteReservation({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

module.exports = router;
