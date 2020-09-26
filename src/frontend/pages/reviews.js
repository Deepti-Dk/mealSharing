window.handleReviewRequest = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mealId = urlParams.get('mealid');

  document.body.innerHTML = `
  <div id="top">
  <h1 class="home-h1">Share food, share happiness 
  <ul class="menu">
  
  <li><a href="/addmeals">Add a meal </a></li>
  <li><a href="/reservationdata">Reservation details</a> |</li>
  <li><a href="/reviewdata">Reviews</a> |</li>
  <li><a href="/home">Home</a> |</li></ul></h1>
  
<hr>
  <div class="formdiv">

<form class="form">
<h2>Leave a review</h2>
<hr>

  <label for="mealid">Meal id:</label>
  <input type="number" id="mealid" name="mealid" value="${mealId}"><br><br>

  <label for="title">Title:</label>
  <input type="text" id="title" name="title"><br><br>

  <label for="description">Description: </label>
  <textarea type="text" id="description" name="description" rows="6"></textarea><br><br><br><br><br><br>

  <label for="stars">Number of stars: </label>
  <input type="number" id="stars" name="stars"><br><br>

  <button id="formsubmit" type="submit"> Submit</button>
</form>  
</div>
</div>

<footer class="copyright">Copyright Ⓒ Deepti Sharma
<a href="#top">Back to the top</a>
</footer>
  `;
  document.getElementById('formsubmit').addEventListener('click', addreview);
};

function addreview(event) {
  event.preventDefault();
  const mealid = document.getElementById('mealid').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const stars = document.getElementById('stars').value;

  const inputdata = {
    meal_id: mealid,
    title: title,
    description: description,
    stars: stars,
    created_date: new Date().toISOString().slice(0, 10), //'2020-08-17',
  };
  console.log(inputdata);
  fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(inputdata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
