const supabase = require('./SupaBase');

//initialise empty array
var myData = [];

async function copyArray() 
{
  let { data: myTable, error } = await supabase.from("myTable").select("*");

  //copy data
  
    for (let i = 0; i < myTable.length; i++) 
    {
      myData[i] = myTable[i];
    }
}

copyArray();

module.exports = myData;
