var data = require("./data");

var getID = require("./getID")

class Controls {
  //get all data
  static getData() {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  //update item
  static updateItem(id, title, text, category, img)
  {
    return new Promise((resolve, reject)=>{
    const item = data.find((element) => element.id === parseInt(id));
    
    if(item)
    { 
      
      item.title = title,
      item.text = text;
      item.img = img;
      item.category = category
    
      resolve(item)

    }
    else 
    {
      reject(`could not find item with id ${id}`)
    }

    })
  }

  //get single data
  static async getDatum(id) {
    return new Promise((resolve, reject) => {
      const item = data.find((element) => element.id === parseInt(id));

      if (item) {
        resolve(item);
      } else {
        reject(`Couldn't find item with id of ${id}`);
      }
    });
  }

  //add to list
  static addData(title, text, category, img) {
    return new Promise((resolve, reject) => {
      data = [
        ...data,
        {
          id: getID(),
          title: title,
          category: category,
          text: text,
          img: img,
          background: "This is the background",
        },

        
      ];
      
      resolve(data);
    });
  }

  //delete single data by id
  static deleteDatum(id) {
    return new Promise((resolve, reject) => {
      var item = data.find((element) => element.id === parseInt(id));
    
      if (item) {
        data = data.filter((element) => element.id !== parseInt(id));

        resolve(data);
      } else {
        reject(`Couldn't find item with id of ${id}`);
      }
    });
  }
}

module.exports = Controls;
