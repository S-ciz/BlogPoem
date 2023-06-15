let baseUrl = window.location.origin + "/calvin/data";
let options = {
  method: "GET",
  header: { "Content-Type": "application/json" },
};

function setLocalStorage(arr) {
  localStorage.setItem("data", JSON.stringify(arr));
}

function sameContent(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Sort the arrays to ensure consistent ordering for comparison
  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();

  // Compare each object in the arrays
  for (let i = 0; i < sortedArray1.length; i++) {
    const obj1 = sortedArray1[i];
    const obj2 = sortedArray2[i];

    // Convert the objects to strings for comparison
    const stringObj1 = JSON.stringify(obj1);
    const stringObj2 = JSON.stringify(obj2);

    // Compare the stringified objects
    if (stringObj1 !== stringObj2) {
      return false;
    }
  }

  // All objects are the same
  return true;
}
//getAllItems

async function getAll() {
  let res = await fetch(baseUrl, options);
  let data = await res.json();
  let localdata = JSON.parse(localStorage.getItem("data"));
  let isSameContent = false;

  if (localdata !== null) {
    isSameContent = sameContent(data, localdata);
  }

  //check if content is the same then update
  if (isSameContent === false) {
    setLocalStorage(data);
   // window.location.reload();
    console.log("data has been loaded...");
  }
}

getAll();

//get all poems
function getPoems() {
  let data = JSON.parse(localStorage.getItem("data"));

  if (data && data.length > 0) {
    let poems = data.filter((poem) => poem.category === "poem");

    return poems.reverse();
  } else {
    console.log("no data found...");
  }
}

//get blogs
function getBlogs() {
  let data = JSON.parse(localStorage.getItem("data"));

  if (data && data.length > 0) {
    let blogs = data.filter((poem) => poem.category === "blog");
    return blogs.reverse();
  }
}

//get item by id
function getItem(id) {
  var data = JSON.parse(localStorage.getItem("data"));

  var obj;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      obj = data[i];
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
async function updateItem(id, bodyContent) {
  let headersList = {
    "Content-Type": "application/json",
  };
  const newurl = baseUrl + "/" + id;
  let response = await fetch(newurl, {
    method: "PATCH",
    body: JSON.stringify(bodyContent),
    headers: headersList,
  });

  if (response.ok) {
    console.log(response);
    return await response.text();
  }
}
