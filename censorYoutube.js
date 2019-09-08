// ==UserScript==
// @name     Youtube addiction remover
// @version  2
// @include https://www.youtube.com*
// @include https://www.youtube.com/watch*
// @grant    none
// @run-at document-idle
// ==/UserScript==

main();

var mainElement = document.getElementsByTagName("ytd-app")[0];

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.type == "attributes") {
            main();
        }
    });
});
observer.observe(mainElement, {attributes: true});

function main() {
    let currUrl = window.location.href;

    console.log("Starting Main Script");
    if (currUrl === "https://www.youtube.com" || currUrl === "https://www.youtube.com/") {
        var waitForMainLoad = setInterval(function() {
            let mainArea = document.body.getElementsByTagName("ytd-browse");
            if(mainArea.length > 0 && mainArea[0].getAttribute("hidden") !== "") {
                console.log("Checking Main");
                sanitizeMainPage();
                console.log("COMPLETED Main");
                clearInterval(waitForMainLoad);
            }
        }, 500);
    } else if (currUrl.includes("www.youtube.com/watch")) {
        var waitForWatchLoad = setInterval(function() {
            let suggestedVids = document.body.getElementsByClassName("ytd-watch-next-secondary-results-renderer");
            if(suggestedVids.length > 0 && suggestedVids[0].getAttribute("hidden") !== "") {
                console.log("Checking Watch Page");
                sanitizeWatchPage();
                console.log("COMPLETED Watch Page");
                clearInterval(waitForWatchLoad);
            }
        }, 500);
    }
}


function sanitizeMainPage() {
    let mainViewArea = document.body.getElementsByTagName("ytd-browse");
    mainViewArea[0].setAttribute("hidden", "");
}

function sanitizeWatchPage() {
    let endScreen       = document.body.getElementsByClassName("ytp-endscreen-content");
    let suggestedVideos = document.body.getElementsByClassName("ytd-watch-next-secondary-results-renderer"); 
    let autoPlayBtn     = document.getElementById("toggle");

    if(autoPlayBtn !== null && (autoPlayBtn.getAttribute("checked") != null || autoPlayBtn.getAttribute("active") != null)) {
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