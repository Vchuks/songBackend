
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getting user...")
            resolve({ id: id, name: "Helen" })
            // reject(new Error)
        }, 2000)
    })
}

const result = getUser(3)
result.then((data) => console.log(data))
result.catch(err => err.message)

fetch("url")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(err => console.log(err))

async function getData() {
    try {
        const res = await fetch("url")
        const data = await res.json()
        console.log(data)

    } catch (err) { 
        console.log(err.message)
    }
}

