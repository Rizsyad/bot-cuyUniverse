const navbar = document.getElementById("header");

window.addEventListener("scroll", function(){
  if(window.scrollY > 20) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
})