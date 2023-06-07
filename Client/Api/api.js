let baseUrl = window.location.origin + "/calvin/data";
let options = {
  method: "GET",
  header: { "Content-Type": "application/json" },
};

function sameSize(local_array, data_array)
{

return (local_array.length == data_array.length)

}

function setLocalStorage(arr)
{
  localStorage.setItem('data', JSON.stringify(arr))
}

function sameContent(array1, array2)
{
     if(array1.length == array2.length)
     {
       return JSON.stringify(array1) == JSON.stringify(array2)? true: false;
     } 
     
}
//getAllItems
async function getAll() {
 
  var localdata = JSON.parse(localStorage.getItem('data'));

  if(!localdata || localdata.length == 0)
  {  
    let res = await fetch(baseUrl, options);
    let data = await res.json();
    setLocalStorage(data)
    window.location.reload();

    console.log("data has been loaded...");
  }

}

getAll();

//get all poems
 function getPoems() {
   
  let data = JSON.parse(localStorage.getItem('data'))
   
  if(data && data.length > 0)
  {
    let poems = data.filter((poem) => poem.category === "poem");

    return poems.reverse();
  }
  else 
  {
     console.log("no data found...");
  }

  
}

//get blogs
 function getBlogs() {
    
  let data = JSON.parse(localStorage.getItem('data'))
   
  if(data && data.length > 0)
  {
    let blogs = data.filter((poem) => poem.category === "blog");
    return blogs.reverse();
  }
    
  
}

//get item by id
 function getItem(id) {

  var data = JSON.parse(localStorage.getItem('data'))
   
    var obj
   
    for(let i = 0; i< data.length; i++)
    {

      if(data[i].id == id)
      {
       
        obj = data[i]
        break;
      }
    }

  return obj;

}


//generate randomNumber
function generateRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

async function getRandom(intCount) {
  let arr = [];
  let res = await fetch(baseUrl, options);
  let data = await res.json();
  let randNumber = generateRandomNumber(data.length - 1);
  let prevNumber;

  for (let i = 0; i < intCount; i++) {
    while (prevNumber == randNumber) {
      randNumber = generateRandomNumber(data.length - 1);
    }

    arr[i] = data[randNumber];

    prevNumber = randNumber;
  }

  return arr;
}



//Posting to  database
async function PostContent(bodyContent) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(bodyContent),
    headers: headersList,
  });

  let data = await response.text();

}

//remove from database
async function removeItem(id) {
  let headersList = {
    "Content-Type": "application/json",
  };
  const newurl = baseUrl + "/" + id;
  let response = await fetch(newurl, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.text();
  console.log(data);

}


//update data
async function updateItem(id, bodyContent)
{
  let headersList = {
    "Content-Type": "application/json"
   }
   const newurl = baseUrl + "/" + id;
   let response = await fetch(newurl, { 
     method: "PUT",
     body: JSON.stringify(bodyContent),
     headers: headersList
   });
   
   let data = await response.text();
 
   
}