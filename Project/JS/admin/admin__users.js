let statutAlert = [
    {
        class:"red",
        comment:"đang khóa",
        btn:"Mở khóa"
    },
    {
        class:"alertAccout",
        comment:"đang hoạt động",
        btn:"Khóa"
    }
]


document.getElementsByClassName("same")[2].style.backgroundColor="antiquewhite"
document.getElementsByClassName("same")[2].style.color="brown"
document.getElementsByClassName("same")[1].style.backgroundColor=""
document.getElementsByClassName("same")[1].style.color="antiquewhite"

let listUserArr = listUser
function findUser(){
    if(document.getElementById("findUser").value == ""){
        listUserArr = listUser
    }else{
        listUserArr = listUser.filter((element)=> {
        if(element.id == document.getElementById("findUser").value){
            return element
        }
    })
    }
    renderUsers()
}
let currentPageUser = 1
let productsPerPage = 7
function renderUsers(){
    let start = (currentPageUser-1)*productsPerPage
    let end = currentPageUser*productsPerPage
    if(end > listUserArr.length){
        end = listUserArr.length
    }
    let totalPage = Math.ceil(listUserArr.length/productsPerPage)
    let text =""
    for(let i=start;i<end;i++){
        if(listUserArr[i].role != "admin"){
            text += `
        <tr>
                <td>${i+1}</td>
                <td>${listUserArr[i].id}</td>
                <td><img src=${listUserArr[i].avatar}></td>
                <td>${listUserArr[i].email}</td>
                <td>${listUserArr[i].username}</td>
                <td style="display: flex;justify-content: center;align-items: center;padding: 1.5vw; gap: 1vw;" class="satus" >
                    <div class=${statutAlert[listUserArr[i].status].class}></div> <div class="comment" >${statutAlert[listUserArr[i].status].comment}</div></td>
                <td>
                    <button onclick="changeStatus(${listUserArr[i].id})">${statutAlert[listUserArr[i].status].btn}</button>
                </td>
        </tr>
        `
        }
        
    }
    document.getElementById("body").innerHTML = text
    let dot = ""
    for (let i = 0; i < totalPage; i++) {
        dot += 
        `
            <li onclick="changePageUser(${i+1})"></li>
        `
    }
    document.getElementById("dotsUser").innerHTML = dot
}
renderUsers()

function changePageUser(index){
        currentPageUser = index
        renderUsers()
}

function changeStatus(id){
    for(let i =0 ;i<listUser.length;i++){
        if(listUser[i].id == id){
            if(listUser[i].status == 1){
                listUser[i].status = 0
                localStorage.setItem("listUser",JSON.stringify(listUser))
            }else{
                listUser[i].status = 1
                localStorage.setItem("listUser",JSON.stringify(listUser))
            }
            renderUsers()
        }
    }

}