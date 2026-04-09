let elList = document.querySelector(".navbar-list")
let elIframe = document.querySelector(".iframe")

let elSearchInput = document.querySelector(".search-input")
let elSearchBtn = document.querySelector(".search-btn")

let elIframeHome = document.querySelector("#homeButton a")

let elAvatarImg = document.querySelector(".avatar-img")

let userId


// get usersList start
async function getUsers() {
    let res = await axios("https://n105.softwareengineer.uz/api/v1/users/all")
    let data = res.data.data
    if(res.status === 200){
        data.forEach(item => {
            
            let elItem = document.createElement("li")
            elItem.className += "channel"
            
            elItem.innerHTML = `
                <a onclick="handleUsers(event, ${item.id})" href="#">
                    <img src="https://n105.softwareengineer.uz/api/v1/files/${item.photo}" alt="channel-icon" width="30px" height="30px">
                    <span>${item.name}</span>
                </a>
            `
            elList.append(elItem)
        });
    }
}
getUsers()
// get usersList end


// timeformat start
function formatDate(dateStr) {
    let date = new Date(dateStr)
    
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let hours = String(date.getHours()).padStart(2, '0')
    let minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}/${month}/${day} | ${hours}.${minutes}`
}
// timeformat send


// single user start
async function handleUsers(e, id){
    list1.innerHTML = ''
    
    document.querySelectorAll(".channel").forEach(item => {
        item.classList.remove("active")
    })
    e.currentTarget.closest(".channel").classList.add("active")
    
    let res = await axios(`https://n105.softwareengineer.uz/api/v1/users/files/${id}`)
    if(res.data.data.length === 0){
        let elTitle = document.createElement("h1")
        elTitle.classList.add("active")
        elTitle.textContent = "No DATA"
        list1.append(elTitle)
    }
    else{
        async function userAlls(id) {
            list1.innerHTML = ""
            
            let userAll = await axios(`https://n105.softwareengineer.uz/api/v1/users/files/${String(id)}`)
            
            const data = userAll.data.data
            
            data.files.forEach(item => {
                let elIframeItem = document.createElement("li")
                
                elIframeItem.innerHTML = `
                    <div class="home-div">
                        <video src="https://n105.softwareengineer.uz/api/v1/files/${item.file}" controls=""></video>
                        <div class="iframe-footer">
                                        <img src="https://n105.softwareengineer.uz/api/v1/files/${data.photo}" alt="channel-icon">
                                        <div class="iframe-footer-text">
                                            <h2 class="channel-name">${item.title}</h2>
                                            <h3 class="iframe-title">${data.name}</h3>
                                            <time class="uploaded-time">${formatDate(item.createdAt)}</time>
                                            <a class="download" href="#">
                                                <span>${item.size} MB</span>
                                                <img src="./img/download.png">
                                            </a>
                                        </div>
                        </div>
                    </div>
                `
                list1.append(elIframeItem)
            })
        }
        userAlls(id)
    }
}
// single user end


// Home start
async function allVideos() {
    let res = await axios("https://n105.softwareengineer.uz/api/v1/files/all")
    const data = res.data.data
    
    renderHome(data)
}
function renderHome(data){
    data.forEach(item => {
        let elDiv = document.createElement("div")
        elDiv.className = "home-div"
        
        elDiv.innerHTML = `
            <video src="https://n105.softwareengineer.uz/api/v1/files/${item.file}" controls=""></video>
            <div class="iframe-footer">
                <img src="https://n105.softwareengineer.uz/api/v1/files/${item.user.photo}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${item.title}</h2>
                    <h3 class="iframe-title">${item.user.name}</h3>
                    <time class="uploaded-time">${formatDate(item.createdAt)}</time>
                    <a class="download" href="#">
                        <span>${item.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>
            </div>
        `
        list1.append(elDiv)
    })
}

allVideos()
elIframeHome.addEventListener("click", async function(e) {
    e.preventDefault()
    list1.innerHTML = ""
    
    document.querySelectorAll(".channel").forEach(item => {
        item.classList.remove("active")
    })
    document.querySelector("#homeButton").classList.add("active")
    
    allVideos()
})
// Home end


// search start
elSearchBtn.addEventListener("click", async function(e){
    e.preventDefault()
    list1.innerHTML = "" 
    
    const searchVlaue = elSearchInput.value.trim()
    
    let res = await axios(`https://n105.softwareengineer.uz/api/v1/files/all?title=${searchVlaue}`)
    let resalt = res.data.data
    
    renderHome(resalt)
})
// search end



// voice start
const recognition = new SpeechRecognition()
recognition.lang = "uz-UZ"

function voice(){    
    recognition.start()
}
recognition.onresult = (event) => {
    const resData = event.results[0][0].transcript
    
    async function smthGood() {
        list1.innerHTML = ""
        let res = await axios(`https://n105.softwareengineer.uz/api/v1/files/all?title=${resData}`)
        let resalt = res.data.data
        renderHome(resalt)
        
    }
    smthGood()
    console.log(resData);
}
// voice end



// avatar img start
async function getAvantarImg() {
    let res = await axios("https://n105.softwareengineer.uz/api/v1/users/all")
    let data = res.data.data
    
    let user = window.localStorage.getItem("user")
    
    data.forEach(item => {
        if(item.name == user){
            console.log(item.photo);
            let userImg = window.localStorage.setItem("user-img", item.photo)
            elAvatarImg.src = `https://n105.softwareengineer.uz/api/v1/files/${item.photo}`
        }
    })
}
getAvantarImg()
// avatar img start



list.addEventListener("click", function(e){
    let token = window.localStorage.getItem("accesToken")
    if(token){
        window.location = "admin.html"
    }
    else{
        window.location = "login.html"
    }
})