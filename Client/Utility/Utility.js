//trancate text
function truncate(text, length) {
  text = text.trim().split(" ");
  if (text.length > length) {
    text.length = length;

    return text.join(" ") + "...";
  } else {
    return text.join(" ");
  }
}

//Alert message
function displayMessage(div, message, background, timeout) {
  div.textContent = message;
  div.style.backgroundColor = background;
  //style div
  div.style.width = "80%";
  div.style.margin = "auto";
  div.style.display = "grid";
  div.style.textAlign = "center";
  div.style.borderRadius = "1rem";
  div.style.color = "#fff";

  setTimeout(() => {
    div.remove();
  }, timeout);
}


