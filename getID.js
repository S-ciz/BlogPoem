const data = require("./data");
const id_length = 10000000000;

function generateRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getID() {
  var newID = generateRandomId(id_length);
  data.forEach((element) => {
    while (element.id == newID) {
      newID = generateRandomId(id_length);
    }
  });

  return newID;
}

module.exports = getID;
