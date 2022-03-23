//! declaration 
let preIcon = document.querySelector('.previous-icon')
let afterIcon = document.querySelector('.after-icon')
let slides = document.getElementsByClassName("slider")
let slideIndex = 1;

//! slider function
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slider");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}
//! slider addEventListener
preIcon.addEventListener('click', () => {
  plusSlides(-1);
})
afterIcon.addEventListener('click', () => {
  plusSlides(1)
})