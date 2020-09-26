const express = require('express');
const router = express.Router();
const knex = require('../database');
/************************************************************ */
/****************         Reviews-APIs      ******************/
/********************************************************** */

//api/reviews/	GET	Returns all reviews	GET api/reviews/
router.get('/', async (request, response) => {
  try {
    const allReviews = await knex('review').select('*');
    response.json(allReviews);
  } catch (error) {
    throw error;
  }
});

// api/reviews/	POST	Adds a new review	POST api/reviews/
const createReview = async ({ body }) => {
  const { id, title, description, meal_id, stars, created_date } = body;
  return await knex('review').insert({
    id: id,
    title: title,
    description: description,
    meal_id: meal_id,
    stars: stars,
    created_date: created_date,
  });
};
router.post('/', async (request, response) => {
  createReview({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send('Bad request').end();
      console.log(error);
    });
});

//api/reviews/{id}	GET	Returns review by id	GET api/reviews/2
router.get('/:id', async (request, response) => {
  try {
    const specificReview = await knex('review')
      .select('*')
      .where({
        id: parseInt(request.params.id),
      });
    response.json(specificReview);
  } catch (error) {
    throw error;
  }
});

// api/reviews/{id}	PUT	Updates the review by id	PUT api/reviews/2
const editReview = async ({ body, id }) => {
  const { title, description, meal_id, stars, created_date } = body;
  const review = await knex.from('review').select('*').where({
    id: id,
  });
  if (review.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  const queryDto = {
    id,
    title,
    description,
    meal_id,
    stars,
    created_date,
  };

  if (Object.keys(queryDto).length !== 0) {
    return await knex('review')
      .where({
        id: id,
      })
      .update(queryDto);
  } else return 'Nothing updated!';
};

router.put('/:id', async (req, res) => {
  editReview({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

// api/reviews/{id}	DELETE	Deletes the review by id	DELETE api/reviews/2 */
const deleteReview = async ({ id }) => {
  const review = await knex.from('review').select('*').where({
    id: id,
  });
  if (review.length === 0) {
    throw new HttpError('Bad request', `Contact not found: ID ${id}!`, 404);
  }
  if (Object.keys(review).length !== 0) {
    return await knex('review')
      .where({
        id: id,
      })
      .delete(review);
  } else return 'Nothing updated!';
};

router.delete('/:id', async (req, res) => {
  deleteReview({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

module.exports = router;
