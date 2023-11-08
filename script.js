document.addEventListener("DOMContentLoaded", ()=>{

    const accessKey = "Dl_qYR6bivr9JFJhNHVWcq3_xcBNm_lbg0rX5GIVV10";

    const formElem = document.querySelector("form");
    const inputElem1 = document.getElementById("search-input");
    const searchResults = document.querySelector(".search-results");
    const showMore = document.getElementById("show-more-button");

    let inputData = "";
    let page = 1;

    async function searchImages(){
        inputData = inputElem1.value;

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;


        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if(page === 1){
            searchResults.innerHTML = "";
        }

        results.map((result) =>{
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imagesLink = document.createElement("a");
            imagesLink.href = result.links.html;
            imagesLink.target = "_blank";
            imagesLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imagesLink);
            searchResults.appendChild(imageWrapper);
        })

        page++

        if(page > 1){
            showMore.style.display = "block";
        }
    }

    formElem.addEventListener("submit",(event) =>{
        event.preventDefault();
        page = 1;
        searchImages();
    })

    showMore.addEventListener("click",() =>{
        searchImages();
    })

})
