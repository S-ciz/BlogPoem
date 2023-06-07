const http = require("http");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const controls = require("./controls");
const bodyParser = require("body-parser");

//superbase
const supabase = require('./SupaBase');
const { log } = require("console");

//use body parser
app.use(bodyParser.json());

//use cors
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, "./Client")));
const server = http.createServer(app);

//get all data
app.get("/calvin/data", async (req, res) => {
  const _data = await controls.getData();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(_data));
});

//get single item
app.get("/calvin/data/:id", async (req, res) => {
  const id = req.url.split("/")[3];

  try {
    const _data = await controls.getDatum(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.status(200);
    res.end(JSON.stringify(_data));
  } catch (err) {
    res.status(404);
    res.json({ Message: JSON.stringify(err) });
  }
});


//post an item
app.post("/calvin/data", async (req, res) => {

  res.writeHead(200, { "Content-Type": "Application/json" });

  
  try 
  {
  const data = await controls.addData(
    req.body.title,
    req.body.text,
    req.body.category,
    req.body.img
  );
  res.end(JSON.stringify(data));
  
  const obj = {
    "title": req.body.title,
    "text": req.body.text,
    "category": req.body.category,
    "img": req.body.img
  }
  
const { mydata, error } = await supabase
.from('myTable')
.insert([
 obj
])

  }catch(err)
  {
    res.status(404);
    res.json({ Message: JSON.stringify(err) });
  }


  

});

//delete an item
app.delete("/calvin/data/:id", async (req, res) => {
  const id = req.url.split("/")[3];

  try {
    const _data = await controls.deleteDatum(id);
    //  res.writeHead(200, {"Content-Type": "application/json"})
    res.status(200);
    res.end(JSON.stringify(_data));

    //remove from supabase
    const { data, error } = await supabase
  .from('myTable')
  .delete()
  .eq('id', id)
  
  } catch (err) {
    res.status(404);
    res.json({ Message: JSON.stringify(err) });
  }
});


//update an item
app.put("/calvin/data/:id", async (req, res) => {
  
  //res.writeHead(200, { "Content-Type": "Application/json" });
  try 
  {
  const id = req.url.split("/")[3];
  const title = req.body.title;
  const text = req.body.text;
  const category = req.body.category;
  const img = req.body.img

  var obj  = {title, title, text, category, img}
  var _data = await controls.updateItem(id,title, text,category, img);
 
  //update from database
  const { data, error } = await supabase
  .from('myTable')
  .update(JSON.stringify(obj))
  .eq("id", id)
  
  res.end(JSON.stringify(_data));

  } catch(err)
  {
    res.status(404);
    res.json({ Message: JSON.stringify(err) });
  }

});

//run on PORT 5000
const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
