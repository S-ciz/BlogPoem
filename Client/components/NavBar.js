var navTemplate = document.createElement("template");

navTemplate.innerHTML = ` <ul style="color: #fff;" class="menu"> <i class="fa fa-bars fa-2x"></i> </ul>`;
class Nav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
  }
}

window.customElements.define("nav-bar", Nav);
