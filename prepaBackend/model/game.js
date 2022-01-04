"use strict";
const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");

const jsonDbPath = __dirname + "/../data/game.json";

// Default games
const defaultGames = [
  {
    id: 1,
    name: "Minecraft",
    link: "https://www.youtube.com/watch?v=A-Ak9K5d6Ew",
    like: 0,
  },
];

class Games {
  constructor(dbPath = jsonDbPath, defaultItems = defaultGames) {
    this.jsonDbPath = dbPath;
    this.defaultGames = defaultItems;
  }

  getNextId() {
    const games = parse(this.jsonDbPath, this.defaultGames);
    let nextId;
    if (games.length === 0) nextId = 1;
    else nextId = games[games.length - 1].id + 1;
    return nextId;
  }

  /**
   * Returns all games
   * @returns {Array} Array of games
   */
  getAll() {
    const games = parse(this.jsonDbPath, this.defaultGames);
    return games;
  }

  /**
   * Add a game in the DB and returns the added game (containing a new id)
   * @param {object} body - it contains all required data to create a game
   * @returns {object} the game that was created (with id)
   */

  addOne(body) {
    const games = parse(this.jsonDbPath, this.defaultGames);

    // add new game to the menu : escape the title & content in order to protect agains XSS attacks    
    const newGame = {
      id: this.getNextId(),
      name: escape(body.name),
      link: escape(body.link),
      like: 0,
    };
    games.push(newGame);
    serialize(this.jsonDbPath, games);
    return newGame;
  }

  addOneLike(id) {
    const games = parse(this.jsonDbPath, this.defaultGames);
    const foundIndex = games.findIndex((game) => game.id == id);
    if(foundIndex < 0) return ;
    const updatedgame = {
      id: games[foundIndex].id,
      name: games[foundIndex].name,
      link: games[foundIndex].link,
      like: games[foundIndex].like + 1
    };
    games[foundIndex] = updatedgame;
    serialize(this.jsonDbPath, games);
    return updatedgame;
  }

}

module.exports = { Games };
