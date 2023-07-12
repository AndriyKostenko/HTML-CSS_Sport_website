const slides = document.getElementsByClassName("slide");
var currentSlide = 0;
const tabs = document.getElementsByClassName("catalog__tab");
const contents = document.getElementsByClassName("catalog__content");
const itemContentsMain = document.getElementsByClassName("catalog-item__content");
const itemContentsAdditional = document.getElementsByClassName("catalog-item__list")

const overlay = document.getElementsByClassName('overlay');
const consultationModal = document.getElementById("consultation");
const orderModal = document.getElementById('order');
const modalMini = document.getElementsByClassName('modal_mini');

const consultationButtons = document.querySelectorAll('[data-modal="consultation"]');
const orderButtons = document.querySelectorAll('.button_mini')
const closeButtons = document.querySelectorAll(".modal__close");


const moreLinks = Array.prototype.slice.call(document.getElementsByClassName("catalog-item__link"));
const backLinks = Array.prototype.slice.call(document.getElementsByClassName("catalog-item__back"));



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




function toggleRequestModal(buttons, modal, overlay) {

    buttons.forEach( function(element) {
        element.addEventListener("click", function() {
     
            if (overlay[0].classList.contains('overlay--trigger') === false) {
                overlay[0].classList.add('overlay--trigger');
                modal.classList.add('modal--trigger');
            }
            else {
                overlay[0].classList.remove('overlay--trigger');
                modal.classList.remove('modal--trigger');
            }
        
        })
    })
}

function orderRequestModal(buttons, modal, overlay) {

    const descr = modal.querySelectorAll('.modal__descr');
    const subtitle = document.querySelectorAll('.catalog-item__subtitle');

    buttons.forEach( function(element, index) {
        element.addEventListener('click', function() {

            if (overlay[0].classList.contains('overlay--trigger') === false) {
                descr[0].innerHTML = subtitle[index].innerHTML; // changing text in the modal window according an order
                overlay[0].classList.add('overlay--trigger');
                modal.classList.add('modal--trigger');
            }
            else {
                modal.classList.remove('modal--trigger');
                overlay[0].classList.remove('overlay--trigger');
                
            }

        })
    })
}


            
showSlide();

changeTab(0);

toggleItemSlide(moreLinks);
toggleItemSlide(backLinks);

toggleRequestModal(consultationButtons, consultationModal, overlay);
orderRequestModal(orderButtons, orderModal, overlay);
toggleRequestModal(closeButtons, consultationModal, overlay);

