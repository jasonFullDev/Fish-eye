function hydratePhotoFactory(dataPhoto, name) {
    
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${dataPhoto.image}`;

    const videoPath = `../assets/Sample_Photos/${pathName}/${dataPhoto.video}`;

    getHydratingPhoto();

  
   
    function getHydratingPhoto() {
    
        const templateElm = document.querySelector(".photo__template");
        const photo= document.importNode(templateElm.content, true);

        let media = photo.querySelector("#img__card");

        
        if(dataPhoto.video !== undefined)
        {  
            media.remove()
            media = photo.querySelector("#video__card")
            media.src = videoPath;
        }
        else
        {
            photo.querySelector("#video__card").remove()
            media.src = photoPath;
        }
   
      
        const title = photo.querySelector(".photo__title");
        title.textContent = dataPhoto.title;
        const likes = photo.querySelector(".photo__likes");
        likes.textContent = dataPhoto.likes;
        document.querySelector(".photo-field").appendChild(photo);
    
     

  
    }

    

}
    

export default hydratePhotoFactory