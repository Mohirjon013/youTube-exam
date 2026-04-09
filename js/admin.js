let token = window.localStorage.getItem("accesToken")
let userImg = window.localStorage.getItem("user-img")
let userName = window.localStorage.getItem("user")


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


// uploaded start
async function uploadedVideo(e){
    e.preventDefault()

    const data = new FormData()
    data.append("title", videoInput.value)
    data.append("file", uploadInput.files[0])
    const res = await axios.post("https://n105.softwareengineer.uz/api/v1/files", data, {
        headers:{
            Authorization:`Bear ${token}`
        }
    })

    if(res.status === 201){
        alert("File muvaffaqiyatli yuklandi")

        videoInput.value = ""
        getAllVideos()
    }
}
// uploaded end


// getAllvideo start 
async function getAllVideos() {
    videosList.innerHTML = ''
    let res = await axios("https://n105.softwareengineer.uz/api/v1/files/my", {
        headers:{
            Authorization:`Bear ${token}`
        }
    })
    let data = res.data.data
    
    data.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "video-item"

        elItem.innerHTML = `
                <video controls src="https://n105.softwareengineer.uz/api/v1/files/${item.file}"></video>
                <div class="admin-div">
                    <img src="https://n105.softwareengineer.uz/api/v1/files/${userImg}" alt="channel-icon">
                    <div class="admin-content">
                        <div class="admin-title-wrapper">
                            <h2 class="admin-name">${userName}</h2>
                            <h3 class="admin-title">${item.title}</h3>
                        </div>
                        <div class="admin-time-size">
                            <time class="admin-time">${formatDate(item.createdAt)}</time>
                            <a class="download-admin">
                                <span>${item.size} MB</span>
                                <img src="./img/download.png" width="14" height="14">
                            </a>
                        </div>
                    </div>
                </div>
                <button onclick="handleDeleteVideo(${item.id})">
                    <img class="delete-icon" src="./img/delete.png" width="25">
                </button>
        `
        videosList.append(elItem)
    });
    
}
getAllVideos()
// getAllvideo end 


// delete start
async function handleDeleteVideo(id){
    let res = await axios.delete(`https://n105.softwareengineer.uz/api/v1/files/${id}`, {
        headers:{
            Authorization:`Bear ${token}`
        }
    })
    getAllVideos()    
}
// delete end


// log out start 
logoutBtn.addEventListener("click", function(){
    window.localStorage.clear()
    window.location = "./register.html"
})
// log out end


videoForm.onsubmit = uploadedVideo
