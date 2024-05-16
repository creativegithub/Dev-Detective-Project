const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-cotainer");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// event listener
btnsubmit.addEventListener("click", function () {
    if(input.value !== "") {
        getUserData(url + input.value);
    }
}); 

input.addEventListener(
    "keydown",
    function (e) {
        if (e.key == "Enter") {
            if(input.value !== ""){
                getUserData(url + input.value);
            }
        }
    },
    false
);

input.addEventListener("input", function () {
    noresults.style.display = "none";
});

console.log(btnmode);

// Check if the element with ID "btn-mode" exists before adding the event listener
if (btnmode) {
    btnmode.addEventListener("click", function () {
        if (darkMode === false) {
            darkModeProperties();
        } else {
            lightModeProperties();
        }
    });
} else {
    console.error('Element with ID "btn-mode" not found.');
}


// function
// API Call
function getUserData(gitUrl){
    fetch(gitUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            throw error;
        });
}

// Render
function updateProfile(data){
    if (data.message !== "Not Found") {
        noresults.style.display = "none";
        function checkNull(param1, param2){
        if (param1 === "" || param1 === null){
            param2.style.opacity = .5
            param2.previousElementSibling.style.opacity = .5;
            return false;
        } else {
            return true;
        }
        }

        avatar.src = `${data.avatar_url}`;
        // Change this line in the updateProfile function
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        let datesegments;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    } else {
        noresults.style.display = "block";
    }
}

// Switch to Dark Mode - activateDarkMode()
function darkModeProperties(){
    root.setProperty("--lm-bg", "#141d2f");
    root.setProperty("--lm-bg-content", "#1e2a47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, .15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    console.log("darkmode changed to" + darkMode);
    localStorage.setItem("dark-mode", true);
    console.log("Setting dark mode to false");
    console.log("Setting dark mode to true");
}

// Switch to light mode -  activateLightMode()
// Switch to light mode - activateLightMode()
function lightModeProperties(){
    const modetextElement = get("mode-text");

    if (modetextElement) {
        root.setProperty("--lm-bg", "#f6f8ff");
        root.setProperty("--lm-bg-content", "#fefefe");
        root.setProperty("--lm-text", "#4b6a9b");
        root.setProperty("--lm-text-alt", "#2b3442");
        root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, .25)");
        modetextElement.innerText = "DARK";
        modeicon.src = "./assets/images/moon-icon.svg";
        root.setProperty("--lm-icon-bg", "brightness(100%)");
        darkMode = false;
        console.log("darkmode changed to" + darkMode);
        localStorage.setItem("dark-mode", false);
        console.log("Setting dark mode to false");
    } else {
        console.error('Element with ID "mode-text" not found.');
    }
}

// Initialise UI 
function init(){
    darkMode = false;
    
    const value = localStorage.getItem("dark-mode");

    if(value == null){
        console.log("null");
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    } else if (value == "true") {
        console.log("true");
        darkModeProperties();
    } else if (value == "false") {
        console.log("false");
        lightModeProperties();
    }

    getUserData(url + "thepranaygupta");

}

init();