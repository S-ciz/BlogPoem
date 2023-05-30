let baseUrl =  "http://localhost5000/calvin/data";
let options = {
  method: "GET",
  header: { "Content-Type": "application/json" },
};

//get all poems
async function getPoems() {
  let res = await fetch(baseUrl, options);
  if (res.ok) {
    let data = await res.json();
    let poems = data.filter((poem) => poem.category === "poem");
    return poems.reverse();
  } else {
    return { Message: "Error getting all poems" };
  }
}

//get blogs
async function getBlogs() {
  let res = await fetch(baseUrl, options);
  if (res.ok) {
    let data = await res.json();
    let blogs = data.filter((poem) => poem.category === "blog");
    return blogs.reverse();
  } else {
    return { Message: "Error fetching all blogs." };
  }
}

//get item by id
async function getItem(id) {
  const newUrl = baseUrl + "/" + id;
  let res = await fetch(newUrl, options);
  if (res.ok) {
    let data = await res.json();

    return data;
  } else {
    return { Message: "Error fetching a particular item by id" };
  }
}

//get random count

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

//getAllItems
async function getAll() {
  let res = await fetch(baseUrl, options);
  let data = await res.json();

  return data;
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
  //console.log(data);
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
