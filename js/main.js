let elList = document.querySelector(".navbar-list")
let elItems = document.querySelector(".channel")
let elIframe = document.querySelector(".iframe")

let elIframeHome = document.querySelector("#homeButton a")



let userId


async function getUsers() {
    let res = await axios("https://n105.softwareengineer.uz/api/v1/users/all")
    
    let data = res.data.data
    
    
    if(res.status === 200){
        data.forEach(item => {
            
            let elItem = document.createElement("li")
            elItem.className += "channel"
            
            elItem.innerHTML = `
                <a onclick="handleUsers(${item.id})" href="#">
                    <img src="https://n105.softwareengineer.uz/api/v1/files/${item.photo}" alt="channel-icon" width="30px" height="30px">
                    <span>${item.name}</span>
                </a>
            `
            elList.append(elItem)
        });
    }
}
getUsers()



async function handleUsers(id){
    list1.innerHTML = ''
    
    let res = await axios(`https://n105.softwareengineer.uz/api/v1/users/files/${id}`)
    if(res.data.data.length === 0){
        let elTitle = document.createElement("h1")
        elTitle.textContent = "No DATA"
        
        list1.append(elTitle)
    }
    else{
        async function userAlls(id) {
            list1.innerHTML = ""
            let userAll = await axios(`https://n105.softwareengineer.uz/api/v1/users/files/${String(id)}`)
            const data = userAll.data.data.files
            console.log(data);

            console.log(data[0]);
            
            
            
            
            // elIframe.innerHTML = `
            //     <div class="home-div">
            //         <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls=""></video>
            //         <div class="iframe-footer">
            //                         <img src="https://cdn-icons-png.flaticon.com/512/146/146031.png" alt="channel-icon">
            //                         <div class="iframe-footer-text">
            //                             <h2 class="channel-name">${data.title}</h2>
            //                             <h3 class="iframe-title">Falonchiga otvet</h3>
            //                             <time class="uploaded-time">${formatDate(data.createdAt)}</time>
            //                             <a class="download" href="#">
            //                                 <span>${data} MB</span>
            //                                 <img src="./img/download.png">
            //                             </a>
            //                         </div>
            //         </div>
            //     </div>    
            //     `
            // list1.append(elIframe)
            
            
            
            
        }
        userAlls(id)
    }
}




// Home start
function formatDate(dateStr) {
    let date = new Date(dateStr)
    
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let hours = String(date.getHours()).padStart(2, '0')
    let minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}/${month}/${day} | ${hours}.${minutes}`
}

async function allVideos() {
    let res = await axios("https://n105.softwareengineer.uz/api/v1/files/all")
    const data = res.data.data
    
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
    allVideos()
})
// Home end