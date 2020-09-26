var root = document.location.origin;
var router = new Navigo(root);

// when no route specified it assumes the base route: "/"
router.on('/', window.handleHomeRequest).resolve();
router.on('/home', window.handleHomeRequest).resolve();
router.on('/reservations', window.handleReservationRequest).resolve();
router.on('/reviews', window.handleReviewRequest).resolve();
router.on('/addmeals', window.handleAddMealRequest).resolve();
router.on('/reservationdata', window.handleReservationListRequest).resolve();
router.on('/reviewdata', window.handleReviewListRequest).resolve();
