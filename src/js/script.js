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

const consultationForm = document.getElementById('form_consultation');
const consultationForm2 = document.getElementById('form_consultation_2');
const orderForm = document.getElementById('form_order');

const consultationName = document.getElementById('consultation_name');
const consultationMobile = document.getElementById('consultation_mobile');
const consultationEmail = document.getElementById('consultation_email');

const consultationName_2 = document.getElementById('consultation_name_2');
const consultationMobile_2 = document.getElementById('consultation_mobile_2');
const consultationEmail_2 = document.getElementById('consultation_email_2');


const orderName = document.getElementById('order_name');
const orderMobile = document.getElementById('order_mobile');
const orderEmail = document.getElementById('order_email');



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


function validateForm(form, name, mobile, email) {

    const setError = (element, messsage) => {
        console.log(element)
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
    
        errorDisplay.innerText = messsage;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };
    
    const setSuccess = element => {
        console.log(element)
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
    
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };
    
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidMobile = mobile => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(mobile);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const userName = name.value.trim(); // to remove all whitespaces
        const userMobile = mobile.value.trim();
        const userEmail = email.value.trim();

        if (userName === '' || userName.length < 2) {
            setError(name, 'Username is required');
        } else {
            setSuccess(name);
        }


        if (userMobile === '') {
            setError(mobile, 'Mobile is requiered');
        } else if(!isValidMobile(userMobile)) {
            setError(mobile, 'Provide a valid mobile number')
        } else {
            setSuccess(mobile)
        }


        if (userEmail === '') {
            setError(email, 'Email is required')
        } else if (!isValidEmail(userEmail)) {
            setError(email, 'Provide a valid email address');
        } else {
            setSuccess(email);
        }
        
    })


}

function maskPhoneInput(phoneInput) {
    phoneInput.addEventListener('input', function(event) {

        var x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    })

}


            
showSlide();
changeTab(0);
toggleItemSlide(moreLinks);
toggleItemSlide(backLinks);
toggleRequestModal(consultationButtons, consultationModal, overlay);
orderRequestModal(orderButtons, orderModal, overlay);
toggleRequestModal(closeButtons, consultationModal, overlay);

validateForm(consultationForm, consultationName, consultationMobile, consultationEmail);
validateForm(orderForm, orderName, orderMobile, orderEmail);
validateForm(consultationForm2, consultationName_2, consultationMobile_2, consultationEmail_2);
maskPhoneInput(consultationMobile);
maskPhoneInput(consultationMobile_2);
maskPhoneInput(orderMobile);



