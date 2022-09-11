const modal = document.getElementById('contact_modal')
const firstname = document.getElementById('first-name')
const lastname = document.getElementById('last-name')
const email = document.getElementById('email')
const message = document.getElementById('message')


function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

function ModalInit(){
    firstname.value = "";
    lastname.value = "";
    email.value="";
    message.value="";
    document.querySelector('#name').innerHTML = document.querySelector('.photographer__name').innerHTML;
    let els = document.querySelectorAll('.errorMsg');
    els.forEach(el => {
        el.classList.remove('display');
    });

    modal.addEventListener('submit', (event) => ModalConfirm(event));
}
   

function ModalConfirm(event){

    let statut = true

    if(firstname.value.length < 2)
    {
        statut = false;
        firstname.parentElement.querySelector('.errorMsg').classList.toggle('display');
    }

    if(lastname.value.length < 2)
    {
        statut = false;
        lastname.parentElement.querySelector('.errorMsg').classList.toggle('display');
    }

    if(!validateEmail(email.value))
    {
        statut = false;
        email.parentElement.querySelector('.errorMsg').classList.toggle('display');
    }

    if(message.value == "")
    {
        statut = false;
        message.parentElement.querySelector('.errorMsg').classList.toggle('display');
    }

    if(statut)
    {
       closeModal();
       return
    }


    /* clear formulaire et close modal */ 


    event.preventDefault();
  
}

// eslint-disable-next-line no-unused-vars
function displayModal() {
	modal.style.display = "block";
    ModalInit()
}

function closeModal() {
  
    modal.style.display = "none";
}
