// back to top button 
let topBarBtn = document.querySelector('#scroll-top');
let body = document.querySelector('body');
let allElements = document.documentElement;
  
window.addEventListener('load',() =>{
    if (body.scrollTop > 5 || allElements.scrollTop > 5) {
        topBarBtn.style.display = 'block';
      } else {
        topBarBtn.style.display = 'none'
      }
    topBarBtn.addEventListener("click", ()=>{
        window.location = '#home';
    });
  });

// slider section 
// ! declaration 
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
 

