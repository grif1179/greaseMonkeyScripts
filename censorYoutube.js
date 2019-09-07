// ==UserScript==
// @name     Youtube addiction remover
// @version  1
// @grant    Author
// ==/UserScript==

let currUrl = window.location.href;
if (currUrl === "https://www.youtube.com/" || currUrl === "https://www.youtube.com") {
    var waitForMainLoad = setInterval(function() {
        console.log("Checking");
        if(document.body.getElementsByTagName("ytd-browse").length > 0 ) {
            sanitizeMainPage();
            console.log("COMPLETED");
            clearInterval(waitForMainLoad);
        }
    }, 500);
} else if (currUrl.includes("www.youtube.com/watch")) {
    var waitForWatchLoad = setInterval(function() {
        console.log("Checking");
        if(document.body.getElementsByClassName("ytd-watch-next-secondary-results-renderer").length > 0 ) {
            sanitizeWatchPage();
            console.log("COMPLETED");
            clearInterval(waitForWatchLoad);
        }
    }, 500);
}


function sanitizeMainPage() {
    let mainViewArea = document.body.getElementsByTagName("ytd-browse");
    mainViewArea[0].setAttribute("hidden", "");
}

function sanitizeWatchPage() {
    let endScreen       = document.body.getElementsByClassName("ytp-endscreen-content");
    let suggestedVideos = document.body.getElementsByClassName("ytd-watch-next-secondary-results-renderer"); 
    let autoPlayBtn     = document.getElementById("toggle");

    if(autoPlayBtn.getAttribute("checked") != null || autoPlayBtn.getAttribute("active") != null) {
        console.log("Auto play turned off");
        autoPlayBtn.click();
    }

    for(let i=0; i < endScreen.length; i++) {
        endScreen[i].setAttribute("hidden", "");
    }

    for(let i=0; i < suggestedVideos.length; i++) {
        suggestedVideos[i].setAttribute("hidden", "");
    }
}