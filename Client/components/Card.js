//Card component for blog and poem
var cardTEmp = document.createElement("template");

//Card styling: css
cardTEmp.innerHTML = ` 
<style> 
.card 
{   
    display: grid;
    width: 200px;
    height: 300px;
    border-radius: 1rem;
    background: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

.card:hover
{
    cursor: pointer;
}

.card img 
{  
    filter: brightness(.9);
    width: 200px;
    height: 150px;
    object-fit: cover;
    border: none;
    border-radius: 1rem 1rem 0 0;

}


.card h3 
{
    color: #333;
    padding-bottom: -2rem;
    text-align: center;
    font-size: 15px;
}

.card small 
{
    padding: 0 1rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
}

button:hover{
    cursor: pointer;
}

.card button 
{
   border-radius: 0 0 1rem 1rem;
   border: none;
   padding: .5rem;
   width:100%;
   background: var(--blue-dark);
   color:var(--white);
}

@media (max-width:600px)
{ 
    .card 
    {
        width: 150px;
        height: 200px;
        object-fit:cover;
    }
    .card img 
    {
        width: 150px;
        height:120px;
        object-fit:cover;
    
    }
    .card small 
    {
      display:none;
    } 
    .card h3 
     {  
     font-size: 13px;
     }
}


</style>

       <div class="card">
           <img src="" alt=""> 
           <h3>Changing Seasons</h3>
           <small> Leaves fall and bloom anew with each passing season...</small>
           <button> Read more </button>
        </div>
  
`;

//Card Component
class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cardTEmp.content.cloneNode(true));
    this.shadowRoot.querySelector("img").src = this.getAttribute("imgsrc");
    this.shadowRoot.querySelector("h3").textContent =
      this.getAttribute("title");
    this.shadowRoot.querySelector("small").textContent =
      this.getAttribute("text");
    this.shadowRoot.querySelector("div").id = this.getAttribute("id");
    this.shadowRoot
      .querySelector(".card")
      .addEventListener("click", this.toggleCard);
  }

  toggleCard(e) {
    if (e.target.textContent.trim() === "Read more") {
      const id = e.target.parentElement.id;
      window.sessionStorage.setItem("id", id);
      window.location.pathname = "../pages/display.html";
    }
  }
}

window.customElements.define("my-card", Card);
