
//when window loads, display content
window.addEventListener("DOMContentLoaded",(e) => {
  const textLength = 4;
  //get poems
    var data = getPoems()
    const poems = document.querySelector("div#poems");
     for(let i =0; i< 4; i++)
     {
      //set poem
      poems.innerHTML += `<div>  
         <my-card id="${data[i].id}" title="${truncate(
          data[i].title,
        3
      )}" text="${truncate(data[i].text, textLength)}" imgsrc="${
        data[i].img
      }"/>     
          </div>`;
    }

  //get blogs
  var blogData = getBlogs()
    const blogs = document.querySelector("div#blogs");
      
    for(let i = 0; i< 4; i++)
    {
 //set blog
 blogs.innerHTML += `<div>  
 <my-card id="${blogData[i].id}" title="${truncate(
  blogData[i].title,
3
)}" text="${truncate(blogData[i].text, textLength)}" imgsrc="${
  blogData[i].img
}"/>     
  </div>`;
    }
     
  
});


