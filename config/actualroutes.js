var express = require("express")
var methodOverride = require('method-override');
var passport = require('passport');

var usersController = require('../controllers/userController');
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");

var Geocoder = require("node-open-geocoder");

var router = express.Router();

router.route("/profile.:format?")
  .get(usersController.getUserProfile)

router.route("/users/:id.:format?")
  .get(usersController.getUserProfile)
  //get user show page

router.route("/users.json")
  .get(usersController.getAllUsers)

router.route("/users/:id/friends")
  .get(usersController.getFriends);

router.route("/trips.:format?")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip);

router.route("/trips/:id.:format?")
  .get(tripsController.getTrip)
  .put(tripsController.updateTrip)
  .delete(tripsController.deleteTrip)
  //get a trip

router.route("/trips.:format?")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip);
  //get all trips/create new trip

router.route("/trips/:id/locations.:format?")
  .get(tripsController.getTripLocations)
  .post(tripsController.addTripLocation)
  //get,post places for trip

router.route("/trips/:tripId/locations/:id.:format?")
  .put(tripsController.updateTripLocation)
  .delete(tripsController.deleteTripLocation)

// protips
router.route("/trips/:id/protips.:format?")
  .get(tripsController.getTripProtips)
  .post(tripsController.addTripProtip)

router.route("/trips/:tripId/protips/:id.:format?")
  .put(tripsController.updateTripProtip)
  .delete(tripsController.deleteTripProtip)

router.route("/")
  .get(function(req,res){
    res.redirect("/login")
  })

router.route("/checkBounds")
  .get(function(req,res){
    var place = req.query.q;
    var geo = new Geocoder();
    geo.geocode(place, function(err,response){
      // console.log(response)
      var accepted = ["administrative","city","continent","country","island"]
      var mod = response.filter(function(d){return accepted.indexOf(d.type)>-1 })
      res.json(mod[0])
    })
  })

//facebook auth
router.get('/auth/validate', usersController.validateUser);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

// Facebook login
router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
  }));

module.exports = router;
