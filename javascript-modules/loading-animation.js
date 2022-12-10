export function displayLoadingAnimation(){
    const loadingAnimationAlreadyOnScreen = document.querySelector("#loading-animation");
    if(loadingAnimationAlreadyOnScreen) return;

    const loadingAnimation = document.createElement("section");
    loadingAnimation.id = "loading-animation";
    document.querySelector("main").appendChild(loadingAnimation);

    for(let iterator = 0; iterator < 3; iterator++){
        const jumpingDot = document.createElement("div");
        jumpingDot.classList.add("jumping-dot");
        jumpingDot.id = ["left", "middle", "right"][iterator];
        loadingAnimation.appendChild(jumpingDot);
    }
}

export function removeLoadingAnimation(){
    const loadingAnimation = document.querySelector("#loading-animation");
    if(loadingAnimation) loadingAnimation.remove();
}
