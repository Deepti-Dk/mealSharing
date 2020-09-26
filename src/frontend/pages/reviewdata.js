window.handleReviewListRequest = () => {
  document.body.innerHTML = `
      <div id="top">
      <h1 class="home-h1">Share food, share happiness 
      <ul class="menu">
      <li><a href="/reservationdata">Reservation details</a></li>
      <li><a href="/addmeals">Add a meal</a> |</li>
       <li><a href="/home">Home</a> |</li>
    </ul></h1>
      
    <hr>
      <div class="pic-header">
      <img class="quote-pic" src="../images/many-kind-different-food.jpg" alt="many-kind-different-food">
      </div>
      <hr>
    <h2 class="home-h2">Reviews<div class="bookmeal"> 
    </h2>
    
    <ul class="all-meals">
    </ul> 
    
    <hr>
     
    <footer class="copyright">Copyright Ⓒ Deepti Sharma
    <a href="#top">Back to the top</a>
    </footer>
    </div>
       `;

  fetch('/api/reviews')
    .then((response) => response.json())
    .then((reviews) => {
      const ul = document.querySelector('.all-meals');
      for (let i = 0; i < reviews.length; i++) {
        let createddate = new Date(reviews[i].created_date)
          .toISOString()
          .slice(0, 10);
        let li = document.createElement('li');
        li.innerHTML = `Title: ${reviews[i].title}\nDescription: ${reviews[i].description}\nMeal ID: ${reviews[i].meal_id}\nStars: ${reviews[i].stars}\nCreated date: ${createddate}`;
        ul.appendChild(li);
      }
    });
};
