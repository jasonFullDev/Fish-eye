function photographerFactory(data) {
    const { name, portrait, id , content , city , country , price } = data;
    const picture = `../assets/Sample_Photos/PhotographersID/${portrait}`;
   

    function getUserCardDOM() {
        const templateElm = document.getElementById("templateArticle");
        const article = document.importNode(templateElm.content, true);
        const img = article.querySelector(".avatar");
        img.src = picture;
        const h2 = article.querySelector( '.photographer__h2' );
        h2.textContent = name;
        const a = article.querySelector("a");
        a.href += `?id=${id}`;

        const locaEl = article.querySelector( '#loca' );
        locaEl.textContent =  city+ ", "+country;


        const desEL = article.querySelector( '#description' );
        desEL.textContent = content;

        const priceEl = article.querySelector( '#price' );
        priceEl.textContent = price + "€/jour";

        document.querySelector(".photographer_section").appendChild(article);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
//../assets/Sample_Photos/PhotographersID
export default photographerFactory