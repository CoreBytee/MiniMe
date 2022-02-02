import { WebRequest } from "../lib/Request.js"


window.addEventListener("load", async function() {
    console.log("Loaded")

    var QueryParameters = new URLSearchParams(window.location.search)

    var UserData = JSON.parse(
        (
            await WebRequest(
                "GET",
                "https://api.mojang.com/users/profiles/minecraft/" + QueryParameters.get("username"),
                [],
                null,
                true
            )
        ).Body
    )
    var UUID = UserData.id
    var UserName = UserData.name

    console.log("UUID is " + UUID)
    console.log("UserName is " + UserName)

    var ZipData = await WebRequest("GET", "../MiniMe.zip", [], null, false)

    var LoadedZip = await JSZip.loadAsync( await ZipData.Raw.blob() )

    var HeadShot = await (await WebRequest(
        "GET", 
        `https://crafatar.com/avatars/${UUID}?overlay=true&size=16`
    )).Raw.blob()

    await LoadedZip.file("pack.png", HeadShot, {})

    var Skin = await (await WebRequest(
        "GET", 
        `https://crafatar.com/skins/${UUID}`
    )).Raw.blob()

    await LoadedZip.file("assets/minecraft/textures/item/totem_of_undying.png", Skin, {})

    console.log(LoadedZip)

    var Base64 = await LoadedZip.generateAsync({type: "base64"})

    //window.location = "data:application/zip;base64," + Base64;

    document.getElementById("download").setAttribute("href", "data:application/zip;base64," + Base64)
    document.getElementById("download").setAttribute("download", `MiniMe - ${UserName}.zip`)


    
    
})