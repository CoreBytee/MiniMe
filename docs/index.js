import { WebRequest } from "./lib/Request.js"


window.addEventListener("load", async function() {
    console.log("Loaded")

    document.getElementById("username").addEventListener("input", Change)
    document.getElementById("skin").setAttribute("src", `https://crafatar.com/renders/body/c06f89064c8a49119c29ea1dbd1aab82`)


    Change()
    
})

async function Change() {

    document.getElementById("skin").setAttribute("src", `https://crafatar.com/renders/body/c06f89064c8a49119c29ea1dbd1aab82`)
    document.getElementById("download").innerText = "Unknown User"
    document.getElementById("download").href = ""


    console.log(document.getElementById("username").value.length)
    if (document.getElementById("username").value.length < 3) {
        return
    }

    console.log("Change")

    var SetName = document.getElementById("username").value

    var RequestData = (await WebRequest(
        "GET",
        "https://api.mojang.com/users/profiles/minecraft/" + document.getElementById("username").value,
        [],
        null,
        true
    ))

    if (RequestData.Response.code != 200) {
        return
    }

    var UserData = JSON.parse(RequestData.Body)

    var UUID = UserData.id
    var UserName = UserData.name
    console.log(UUID)

    if (SetName != document.getElementById("username").value) {
        return
    }

    document.getElementById("download").innerText = "Download"
    document.getElementById("download").href = "./create/?username=" + UserName

    document.getElementById("skin").setAttribute("src", `https://crafatar.com/renders/body/${UUID}?size=4&overlay=true`)

}