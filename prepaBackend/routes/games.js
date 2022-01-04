var express = require("express");
const { Games } = require("../model/game");

var router = express.Router();
const gameModel = new Games();

// GET /games : read all the pizzas from the menu
router.get("/", function (req, res) {
  console.log("GET /games");
  return res.json(gameModel.getAll());
});

// POST /games : create a game to be added to the menu.
// This shall be authorized only to admin user which possesses a valid JWT
// authorize Middleware : it authorize any authenticated user and load the user in req.user
router.post("/", function (req, res) {
  console.log("POST /games");

  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("name") && req.body.name.length === 0) ||
    (req.body.hasOwnProperty("link") && req.body.link.length === 0)
  )
    return res.status(400).end();

  const game = gameModel.addOne(req.body);

  return res.json(game);
});

//PUT ADD ONE LIKE
router.put("/:id", function(req, res) {
  const game = gameModel.addOneLike(req.params.id);
  if(!game) return res.status(404).end();
  return res.json(game);
});

module.exports = router;
