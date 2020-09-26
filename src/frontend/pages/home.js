window.handleHomeRequest = () => {
  document.body.innerHTML = `
  <div id="top">
  <h1 class="home-h1">Share food, share happiness 
  <ul class="menu">
  <li><a href="#contact">Contact</a></li>
  <li><a href="/reservationdata">Reservation details</a> |</li>
  <li><a href="/reviewdata">Reviews</a> |</li>
  <li><a href="/addmeals">Add a meal</a> |</li></ul></h1>
  
<hr>
  <div class="pic-header">
  <img class="quote-pic" src="../images/many-kind-different-food.jpg" alt="many-kind-different-food">
  </div>
  <hr>
<h2 class="home-h2">List of meals available for sharing<div class="bookmeal"> 
</h2>

<ul class="all-meals">
</ul> 

<hr>
<div id="contact">
<form class="contactform">
<h2 style=>Contact us</h2>
<hr>
<h3>Fill out the details and we will reply within 24hours!</h3>
<div>
<label for="name">Name:</label>
<input type="text" id="name" name="name">
</div>
<div>
<label for="phone">Phone number: </label>
<input type="number" id="phone" name="phone">
</div>
<div>
<label for="email">Email:</label>
<input type="email" id="email" name="email">
</div>
<br><br>

<label for="message">Write your message:</label>
<textarea id="message" name="description" rows="6"></textarea>

<button id="contactformsubmit" type="submit"> Submit</button>
</form>
</div>

<footer class="copyright">Copyright Ⓒ Deepti Sharma
<a href="#top">Back to the top</a>
</footer>
</div>
   `;

  fetch('/api/meals')
    .then((response) => response.json())
    .then((meals) => {
      const ul = document.querySelector('.all-meals');
      for (let i = 0; i < meals.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `Meal ID: ${meals[i].id}\nTitle: ${meals[i].title}\nDescription: ${meals[i].description}\n <a href="/reservations?mealid=${meals[i].id}">Reserve</a>\n <a href="/reviews?mealid=${meals[i].id}">Review</a>`;
        ul.appendChild(li);
      }
    });
};
