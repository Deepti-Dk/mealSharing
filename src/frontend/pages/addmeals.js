window.handleAddMealRequest = (params) => {
  document.body.innerHTML = `
  <div id="top">
    <h1 class="home-h1">Share food, share happiness 
    <ul class="menu">
    <li><a href="/reservationdata">Reservation details</a></li>
  <li><a href="/reviewdata">Reviews</a> |</li>

   <li> <a href="/home">Home |</a></li>
    </ul></h1>
    
  <hr>
    <div class="formdiv">
  
  <form class="form">
  <h2>Add a meal and enjoy being a host!</h2>
  <hr>

   <label for="title">Meal title:</label>
    <input type="text" id="title" name="title"><br><br>
  
    <label for="description">Description: </label>
    <textarea type="text" id="description" name="description" rows="6"></textarea><br><br><br><br><br><br>

    <label for="location">Location:</label>
    <input type="text" id="location" name="location"><br><br>

    <label for="maxreservations">Maximum reservations:</label>
    <input type="number" id="maxreservations" name="maxreservations"><br><br>
  
    <label for="price">Price (optional): </label>
    <input type="number" id="price" name="price"><br><br>
   
    <button id="formsubmit" type="submit"> Submit</button>
  </form>  
  </div>
  </div>

  <footer class="copyright">Copyright Ⓒ Deepti Sharma
  <a href="#top">Back to the top</a>
  </footer>
    `;
  document.getElementById('formsubmit').addEventListener('click', addmeal);
};

/* <label for="when">Availability date:</label>
<input type="text" id="when" name="when"><br><br> */

function addmeal(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const maxreservations = document.getElementById('maxreservations').value;
  const price = document.getElementById('price').value;

  const inputdata = {
    title: title,
    description: description,
    location: location,
    when: new Date().toISOString().slice(0, 10),
    max_reservations: maxreservations,
    price: price,
    created_date: new Date().toISOString().slice(0, 10), //'2020-08-17',
  };
  fetch('/api/meals', {
    method: 'POST',
    body: JSON.stringify(inputdata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
