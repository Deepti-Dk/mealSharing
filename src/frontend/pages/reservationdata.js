window.handleReservationListRequest = () => {
  document.body.innerHTML = `
    <div id="top">
    <h1 class="home-h1">Share food, share happiness 
    <ul class="menu">
    <li><a href="/addmeals">Add a meal</a></li>
  <li><a href="/reviewdata">Reviews</a> |</li>
    <li><a href="/home">Home |</a></li></ul></h1>
    
  <hr>
    <div class="pic-header">
    <img class="quote-pic" src="../images/many-kind-different-food.jpg" alt="many-kind-different-food">
    </div>
    <hr>
  <h2 class="home-h2">List of reservations<div class="bookmeal"> 
  </h2>
  
  <ul class="all-meals">
  </ul> 
  
  <hr>
   
  <footer class="copyright">Copyright Ⓒ Deepti Sharma
  <a href="#top">Back to the top</a>
  </footer>
  </div>
     `;

  fetch('/api/reservations')
    .then((response) => response.json())
    .then((reservations) => {
      const ul = document.querySelector('.all-meals');
      for (let i = 0; i < reservations.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `Reservation ID: ${reservations[i].id}\nMeal ID: ${reservations[i].meal_id}\nName: ${reservations[i].contact_name}\nNumber of guests: ${reservations[i].number_of_guests}`;
        ul.appendChild(li);
      }
    });
};
