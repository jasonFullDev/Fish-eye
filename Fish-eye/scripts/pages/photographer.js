import hydratePresentationFactory from "../factories/photographerPage.js";
import hydratePhotoFactory from "../factories/photo.js";
import getSelectedSort from "../functions/getSelectedSort.js";

var photoCard;
var ActualID;
var photoLenght;
var modalZoom = document.querySelector('#modal-zoom-media')



async function initPhotographe() {
   
    const photographerId = getphotographerId();
    await getPresentation(photographerId);
    await getPhotos(photographerId)

  
}



function getphotographerId() {
    return new URL(location.href).searchParams.get("id")
}

async function getPresentation(photographerId) {
    fetch("../data/photographers.json")
        .then(res => res.json())
        .then(data => {
            
            return data.photographers.filter((photographe)=> photographe.id === parseInt(photographerId, 10))

        
        })
        .then(filtingphotographe => {
 
            hydratePresentationFactory(filtingphotographe[0])

            // Photographe Price
            document.getElementById("photographerRate").innerHTML = filtingphotographe[0].price;

            return (filtingphotographe[0].name)
        })
}
async function getPhotos(photographerId) {
    fetch("../data/photographers.json")
        .then(res => res.json())
        .then(data => {
            
            const photos = data.media.filter((photo)=> photo.photographerId === parseInt(photographerId, 10))
            const name = data.photographers.filter((photographer) => photographer.id === parseInt(photographerId, 10))
            return [photos, name[0].name]
        })
        .then(data => {
            RenderPhototgrapher(data);
        })
}


//Ici on génère la page
function RenderPhototgrapher(data){
    const photosId = data[0]
    const name = data[1]
    const SelectSort = document.querySelector('#filter')
    const filterChoice = document.querySelectorAll('.filter-list__item')
    const filterList = document.getElementById('filter-list')
    const filterBtn = document.querySelector('#filter-btn')
    const LikesFilter = document.querySelector('#Popularite')
    const dateFilter = document.querySelector('#Date')
    const titleFilter = document.querySelector('#Titre')


    function openSelectFilter() {
        filterList.classList.toggle("open");
    
    }
    
  
    // Ouverture du select
    SelectSort.addEventListener("click",openSelectFilter);

    /* Fermeture du bouton de trie*/
    filterList.addEventListener("click", () => {
        filterList.classList.remove("open");
  
    });  


    // Par popularité (click du select)
    LikesFilter.addEventListener('click',() => {
        let Actualfilter = 'likes';
        filterBtn.innerHTML = 'Popularité';
  
        getSelectedSort(photosId,name,Actualfilter);
        filterList.addEventListener("click", openSelectFilter);
        photosId.forEach((photo) => {
            hydratePhotoFactory(photo, name)
        })

        InitModalZoom()
    })

    // Par date (click du select)
    dateFilter.addEventListener('click',() => {
        let Actualfilter  = 'date';
        filterBtn.innerHTML = 'Date';
     
        getSelectedSort(photosId,name,Actualfilter);
        filterList.addEventListener("click", openSelectFilter);
        photosId.forEach((photo) => {
            hydratePhotoFactory(photo, name)
        })

        InitModalZoom();
    })

    // Par titre (click du select)
    titleFilter.addEventListener('click',() => {
        let Actualfilter  = 'title';
        filterBtn.innerHTML = 'Titre';
  
        getSelectedSort(photosId,name,Actualfilter);
        filterList.addEventListener("click",openSelectFilter);
        photosId.forEach((photo) => {
            hydratePhotoFactory(photo, name)
        })

        InitModalZoom();
    })

    //On sort par populatité de base
    getSelectedSort(photosId, name,"Popularity");
    photosId.forEach((photo) => {
        hydratePhotoFactory(photo, name)
    })

    InitModalZoom();

}


function InitModalZoom(){
    
    /* ======================= Photo likes ================================== */
    const photoLike = document.querySelectorAll(".photo__likes");

    

    for (let i = 0; i < photoLike.length; i++)
    {

        document.querySelector('#presentation_counter_likes').innerHTML = parseInt(document.querySelector('#presentation_counter_likes').innerHTML) + parseInt(photoLike[i].innerHTML)
       

        photoLike[i].addEventListener("click", () => {
                let HeartSVG = photoLike[i].parentElement.querySelector('.fa-heart')
              

                console.log(HeartSVG.getAttribute('value'))
                if(HeartSVG.getAttribute('value') == "false")
                {
                    photoLike[i].innerHTML = parseInt(photoLike[i].innerHTML) + 1;
                    document.querySelector('#presentation_counter_likes').innerHTML = parseInt(document.querySelector('#presentation_counter_likes').innerHTML) + 1;
                    HeartSVG.classList.remove('far')
                    HeartSVG.classList.add('fas')
                    HeartSVG.setAttribute('value','true')
                }
                else
                {
                    photoLike[i].innerHTML = parseInt(photoLike[i].innerHTML) - 1 ;
                    document.querySelector('#presentation_counter_likes').innerHTML = parseInt(document.querySelector('#presentation_counter_likes').innerHTML) -1;
                    HeartSVG.classList.remove('fas')
                    HeartSVG.classList.add('far')
                    HeartSVG.setAttribute('value','false')
                }
              
            });
    }

    /* ======================================================================= */

    
    // Card Zoom Modal
    photoCard = document.querySelectorAll(".photo__card");
    const menuForm = document.getElementById("modal-menuForm");
    for (let i = 0; i < photoCard.length; i++)
    {
            photoCard[i].querySelector('.photo').addEventListener("click", () => {
                //Init The Zoom Modal  
                ActualID = i;
                modalZoom.innerHTML = '';
                // On ouvre le modal
                menuForm.classList.add("open");
                document.getElementById("modal-menuForm").focus();


                //On essaye de récupèrer le media video sinon on récupère l'image
                try
                {
                    if(photoCard[i].querySelector("#video__card").src.includes('.mp4')) //On test par extension mp4
                    {
                        let a = document.createElement('a');
                        a.href = '#';
                        a.setAttribute('role','button');

                        /* On insert le media dans une video */
                        let video = document.createElement('video')
                        video.classList.add('media__link__video')
                        video.setAttribute('id','video_menuForm')
                        video.setAttribute('type','video/mp4')
                        video.setAttribute('controls','true')
                        video.innerHTML = `<source src="${photoCard[i].querySelector("#video__card").src}">`
                        modalZoom.append(video);
                    }
                }
                catch
                {
                    let img = document.createElement('img');
                    img.src = photoCard[i].querySelector(".photo").src
                    modalZoom.append(img);
                }
        

                /* Affichage des arrows de navigation */
                document.querySelector(".arrow-left").classList.remove('hidden');
                document.querySelector(".arrow-right").classList.remove('hidden');

                //Logique de navigation
                if(ActualID == 0)
                {
                    document.querySelector(".arrow-left").classList.add('hidden');
                }
                if((ActualID+1) == photoCard.length)
                {
                    document.querySelector(".arrow-right").classList.add('hidden');
                }

            });
    }

    /* Eventlistener qui permet de gèrer les arrows */
    document.querySelector(".arrow-left").addEventListener('click',arrowleft);
    document.querySelector(".arrow-right").addEventListener('click',arrowright);

    /* le close btn de la modal */
    menuForm.querySelector(".close").addEventListener("click", () => {
        menuForm.classList.remove("open");
    });     
}

function arrowleft(){
    ActualID--;

    modalZoom.innerHTML = '';

    if(photoCard[ActualID].querySelector('.photo').src.includes('.mp4'))
    {
        let video = document.createElement('video')
        video.setAttribute('id','video_menuForm')
        video.setAttribute('type','video/mp4')
        video.setAttribute('controls','true')
        video.innerHTML = `<source src="${photoCard[ActualID].querySelector(".photo").src}">`
        modalZoom.append(video);
    }
    else
    {
        let img = document.createElement('img');
        img.src = photoCard[ActualID].querySelector(".photo").src
        modalZoom.append(img);
    }


    document.querySelector(".arrow-left").classList.remove('hidden');
    document.querySelector(".arrow-right").classList.remove('hidden');

    if(ActualID == 0)
        document.querySelector(".arrow-left").classList.add('hidden');
}


function arrowright(){
    ActualID++;
    modalZoom.innerHTML = '';

    if(photoCard[ActualID].querySelector('.photo').src.includes('.mp4'))
    {
        let video = document.createElement('video')
        video.setAttribute('id','video_menuForm')
        video.setAttribute('type','video/mp4')
        video.setAttribute('controls','true')
        video.innerHTML = `<source src="${photoCard[ActualID].querySelector(".photo").src}">`
        modalZoom.append(video);
    }
    else
    {
        let img = document.createElement('img');
        img.src = photoCard[ActualID].querySelector(".photo").src
        modalZoom.append(img);
    }

    document.querySelector(".arrow-left").classList.remove('hidden');
    document.querySelector(".arrow-right").classList.remove('hidden');

    if(ActualID+1 == photoCard.length)
        document.querySelector(".arrow-right").classList.add('hidden');
}


initPhotographe ()
