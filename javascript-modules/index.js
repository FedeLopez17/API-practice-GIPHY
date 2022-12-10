import { displayLoadingAnimation, removeLoadingAnimation } from "./loading-animation.js";

const searchBarInput = document.querySelector("#search-bar > input");
const searchButton = document.querySelector("#search-bar > #search-button");
const invalidMessage = document.querySelector(".invalid-message");
const imageElement = document.querySelector("img");

searchBarInput.addEventListener("input", ()=>{
    invalidMessage.innerText = "";
    searchBarInput.className = "";
})

searchButton.addEventListener("click", gatherSearchTermAndFetchGif);

window.addEventListener("keypress", (event) => {
    const enterKeyWasPressed = event.key === "Enter";
    const searchBarInputIsFocused = searchBarInput === document.activeElement;
    if(enterKeyWasPressed && searchBarInputIsFocused){
        gatherSearchTermAndFetchGif();
    }
})

function gatherSearchTermAndFetchGif(){
    const searchTerm = searchBarInput.value;
    if(!searchTerm) {
        searchBarInput.className = "invalid";
        invalidMessage.innerText = "Please enter a search term!";
        return;
    }

    fetchGif(searchBarInput.value)
        .then(response => setGif(response))
        .catch(displayErrorImage);
    
    displayLoadingAnimation();
}

function displayErrorImage(){
    imageElement.src = "./images/error-image.jpg";
    imageElement.onload = removeLoadingAnimation;
}

function setGif(source){
    imageElement.src = source;
    imageElement.className = "hidden";
    imageElement.onload = () => {
        removeLoadingAnimation();
        imageElement.className = "";
    };
}

async function fetchGif(searchTerm){
    const url = buildGiphyApiEndpointUrl(searchTerm);

    const ApiResponse = await fetch(url, {mode: "cors"});
    const gifData = await ApiResponse.json();
    const gifPromise = Promise.resolve(gifData.data.images.original.url);

    return gifPromise;
}

function buildGiphyApiEndpointUrl(searchTerm){
    const MY_GIPHY_API_KEY = "B0ZAtQBsbI9G5NYqwXeYoIXWx9IOMPnw";
    const endpointUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${MY_GIPHY_API_KEY}&s=${searchTerm}`;
    return endpointUrl;
}