async function UsernameToUUID(Username) {
    const Response = await fetch(`https://playerdb.co/api/player/minecraft/${Username}`)
    if (!Response.ok) return false
    const Data = await Response.json()
    return Data.data.player.id
}

async function UUIDToHeadshot(UUID) {
    const Response = await fetch(`https://crafatar.com/avatars/${UUID}?overlay`)
    if (!Response.ok) return false
    return await Response.blob()
}

async function UUIDToSkin(UUID) {
    const Response = await fetch(`https://crafatar.com/skins/${UUID}`)
    if (!Response.ok) return false
    return await Response.blob()
}