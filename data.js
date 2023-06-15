const supabase = require("./SupaBase");

//initialise empty array
var myData = [];

async function copyArray() {
  let { data: myTable, error } = await supabase.from("myTable").select("*");

  //copy data

  if (myTable) {
    for (let i = 0; i < myTable.length; i++) {
      myData[i] = myTable[i];
    }
  } else {
    myData[0] = {
      title: "nothing",
      text: "nothing",
      img: "nothing",
      id: 0,
      category: "blog",
    };
    myData[0] = {
      title: "nothing",
      text: "nothing",
      img: "nothing",
      id: 0,
      category: "poem",
    };
  }
}

copyArray();

module.exports = myData;
