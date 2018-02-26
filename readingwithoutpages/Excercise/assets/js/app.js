function myFunction() {
  var x = document.getElementById("toggle-text");
  if (x.innerHTML === "delicious!") {
    x.innerHTML = "dangerous!";
  } else {
    x.innerHTML = "delicious!";
  }
}