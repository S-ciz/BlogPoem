let state = false;
const toggleBar = () => {
  const list = document.querySelector("ul.list");
  const bar = document.querySelector("ul.bar");
  state = !state;
  if (state) {
    list.style.display = "flex";
    bar.style.display = "none";
  }
};
