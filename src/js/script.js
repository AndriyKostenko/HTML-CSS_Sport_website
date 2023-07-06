var slides = document.getElementsByClassName("slide");
var currentSlide = 0;
var tabs = document.getElementsByClassName("catalog__tab");
var contents = document.getElementsByClassName("catalog__content");
var itemContentsMain = document.getElementsByClassName("catalog-item__content");
var itemContentsAdditional = document.getElementsByClassName("catalog-item__list")

var moreLinks = Array.prototype.slice.call(document.getElementsByClassName("catalog-item__link"));
var backLinks = Array.prototype.slice.call(document.getElementsByClassName("catalog-item__back"));



function showSlide() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[currentSlide].classList.add("active");
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide();
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide();
}

function changeTab(tabIndex) {
    for (var i =0; i< tabs.length; i++) {
        tabs[i].classList.remove("catalog__tab_active")
        contents[i].classList.remove("catalog__content_active")
    }
    tabs[tabIndex].classList.add("catalog__tab_active");
    contents[tabIndex].classList.add("catalog__content_active");
}


function toggleItemSlide(items) {
    
    items.forEach(function(element, linkIndex) {

        element.addEventListener("click", function(event) {
            event.preventDefault();
     
            for (var itemIndex=0; itemIndex < itemContentsMain.length; itemIndex++) {
                if (linkIndex == itemIndex) {
                    itemContentsMain[itemIndex].classList.toggle('catalog-item__content_active');
                    itemContentsAdditional[itemIndex].classList.toggle('catalog-item__list_active');
                }
            }
        }
    )})
};


            
showSlide();
changeTab(0);
toggleItemSlide(moreLinks);
toggleItemSlide(backLinks);