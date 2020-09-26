const express = require('express');
const router = express.Router();
const knex = require('../database');

/************************************************************ */
/**************         Meals-APIs         *******************/
/************** GET api/meals/ query parameters***************/
/********************************************************** */
router.get('/', async (request, response) => {
  try {
    let meals;
    if (request.query.maxPrice) {
      //maxPrice	Get meals that has a price smaller than maxPrice	Number	/meals?maxPrice=90
      console.log('maxprice check' + Number(request.query.maxPrice));
      meals = await knex('meal')
        .select('*')
        .where('price', '<', Number(request.query.maxPrice));
    } else if (request.query.title) {
      //title	Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde	String	/meals?title=Indian%20platter
      meals = await knex('meal')
        .select('*')
        .where('title', 'like', '%' + request.query.title + '%');
    } else if (request.query.createdAfter) {
      //createdAfter	Get meals that has been created after the date	Date	/meals?createdAfter=2019-04-05
      meals = await knex('meal')
        .select('*')
        .where('created_date', '>', request.query.createdAfter.toString());
    } else if (request.query.limit) {
      //limit	Only specific number of meals	Number /meals?limit=4
      meals = await knex('meal')
        .select('*')
        .orderBy('id')
        .limit(Number(request.query.limit));
    } else if (request.query.availableReservations === 'true') {
      meals = await knex('meal')
        .select('meal.*', knex.raw('sum(reservation.number_of_guests)'))
        .from('meal')
        .leftJoin('reservation', 'meal.id', '=', 'reservation.meal_id')
        .groupBy('meal.id')
        .having(
          'meal.max_reservations',
          '>',
          knex.raw('sum(reservation.number_of_guests)')
        );
    } else {
      //api/meals/	GET	Returns all meals	GET api/meals/
      meals = await knex('meal').select('*');
    }
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

// api/meals/	POST	Adds a new meal	POST api/meals/
const createMeal = async ({ body }) => {
  const {
    id,
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
  } = body;
  return await knex('meal').insert({
    id: id,
    title: title,
    description: description,
    location: location,
    when: when,
    max_reservations: max_reservations,
    price: price,
    created_date: created_date,
  });
};
router.post('/', async (request, response) => {
  createMeal({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send('Bad request').end();
      console.log(error);
    });
});

// api/meals/{id}	GET	Returns meal by id	GET api/meals/2
router.get('/:id', async (request, response) => {
  try {
    const specificMeal = await knex('meal')
      .select('*')
      .where({
        id: parseInt(request.params.id),
      });
    response.json(specificMeal);
  } catch (error) {
    throw error;
  }
});

// api/meals/{id}	PUT	Updates the meal by id	PUT api/meals/2
const editMeals = async ({ body, id }) => {
  const {
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
  } = body;
  const meal = await knex.from('meal').select('*').where({
    id: id,
  });
  if (meal.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  const queryDto = {
    id,
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
  };

  if (Object.keys(queryDto).length !== 0) {
    return await knex('meal')
      .where({
        id: id,
      })
      .update(queryDto);
  } else return 'Nothing updated!';
};

router.put('/:id', async (req, res) => {
  editMeals({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

// api/meals/{id}	DELETE	Deletes the meal by id	DELETE meals/2 */
const deleteMeals = async ({ id }) => {
  const meal = await knex.from('meal').select('*').where({
    id: id,
  });
  if (meal.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  if (Object.keys(meal).length !== 0) {
    return await knex('meal')
      .where({
        id: id,
      })
      .delete(meal);
  } else return 'Nothing updated!';
};

router.delete('/:id', async (req, res) => {
  deleteMeals({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

module.exports = router;
