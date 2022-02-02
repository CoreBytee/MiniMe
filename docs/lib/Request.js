async function WebRequest(Method, Url, Headers=[], Body=null, Proxy=false) {

    console.log(Url)
    var RequestData
    var Body

    if (Proxy == true) {
        RequestData = await fetch(
            "https://Fetch-Proxy.scriptitwithcod.repl.co/request/",
            {
                method: "POST",
        
                body: JSON.stringify(
                    {
                        Method: Method,
                        Headers: Headers,
                        Url: Url,
                        Body: Body
                    }
                )
            }
        );
        var Body = await RequestData.json()
    } else {

        var UnpackedHeaders = []

        for (const Header of Headers){
            console.log(Header)
            UnpackedHeaders[Header[0]] = Header[1]
        }

        RequestData = await fetch(
            Url,
            {
                method: Method,
                body: Body,
                headers: UnpackedHeaders
            }
        );
        var Body = {Raw: RequestData}
    }


    return Body
}

export {WebRequest}