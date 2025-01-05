'use server'

export async function apiRequestHandler(req, res, route, data, extra){
    try{
        if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE"){
            const response = await submit(data, req.method, route)
            // console.log(response)
            res.status(200).json({message: response})
        }
        else if (req.method == "GET"){
            let response;
            const keys = Object.keys(req.body); 
            if (keys.length != 0){
                response = await getSingle(route, data[keys[0]]);
            }
            else{
                response = await getAll(route)
            }
            if (response.data){
                res.status(200).json({data: response.data, message: response.message, extra: extra})
            }
            else{
                res.status(200).json({message: response.message || "Internal server error"})
            }
        }
    }
    catch (error){
        res.status(500).json({message: "Internal server error"})
    }
}

export async function submit(data, method, route){
    try{
        let url = `http://localhost:8002/${route}`
        method !== 'POST' ? url = url.concat(`/${data.id}`) : null; 
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok){
            return `Submission Successful`
        }
        else{
            return `Submission Failed ${response.status} ${response.statusText}`
        }
    }
    catch (error){
        console.log(error)
        return "error"
    }
}

export async function getAll(route){
    try{
        let url = `http://localhost:8002/${route}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok){
            const data = await response.json()
            return {data: data, message: "success"};
        }
        else{
            return {message: `${response.statusText} ${response.status}`}
        }
    }
    catch (error){
        return {message: error.message}
    }
}

export async function getSingle(route, id){
    try{
        let url = `http://localhost:8002/${route}/${id}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok){
            const data = await response.json()
            // console.log(data)
            return {data: data, message: "success"};
        }
        else{
            return {message: `${response.statusText} ${response.status}`}
        }
    }
    catch (error){
        return {message: error.message}
    }
}

export async function getCustom(route, customKey){
    let data = []
    const response = await getAll(route);
    if (response.data){
        for (let d of response.data){
            if (d[customKey.key] == customKey.value) data.push(d);
        }

        return {
            data: data,
            message: response.message
        };
    }
    else return response;
}

export function getCurrentDate() {
    const currentDate = new Date().toJSON();
    return {
        date : currentDate.substring(0, 10),
        year : parseInt(currentDate.substring(0, 4)),
        month : parseInt(currentDate.substring(5, 7)),
        day : parseInt(currentDate.substring(8, 10)),
    }
}