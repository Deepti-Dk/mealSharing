window.handleReservationRequest = (params) => {
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
  <li><a href="/home">Home |</a> </li>
  </ul></h1>
  
<hr>
  <div class="formdiv">

<form class="form">
<h2>Reserve a meal</h2>
<hr>
  <label for="mealid">Meal id:</label>
  <input type="mealid" id="mealid" name="mealid" value="${mealId}"><br><br>
  
  <label for="name">Name:</label>
  <input type="text" id="contactname" name="name"><br><br>

  <label for="number">Number of guests:</label>
  <input type="number" id="number" name="number"><br><br>

  <label for="phone">Phone number: </label>
  <input type="number" id="phone" name="phone"><br><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br><br>

  <button id="formsubmit" type="submit"> Submit</button>
</form>  
</div>
</div>

<footer class="copyright">Copyright Ⓒ Deepti Sharma
<a href="#top">Back to the top</a>
</footer>
  `;
  document
    .getElementById('formsubmit')
    .addEventListener('click', addreservation);
};

function addreservation(event) {
  event.preventDefault();
  const mealid = document.getElementById('mealid').value;
  const name = document.getElementById('contactname').value;
  const number = document.getElementById('number').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const inputdata = {
    number_of_guests: number,
    meal_id: mealid,
    created_date: new Date().toISOString().slice(0, 10), //'2020-08-17',
    contact_phonenumber: phone,
    contact_name: name,
    contact_email: email,
  };
  fetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(inputdata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
