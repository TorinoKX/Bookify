const api_key = "PkJUjvVjGnD42aLraTeZvlrbxskGTtqe"

export async function getLists() {
    const resp = await fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/nyt/lists/names.json?api-key=${api_key}`)
    const data = await resp.json()
    if (data.status === null) {
        console.log('retrieving data')
        return getLists()
    }
    else if (data.status === "OK") {
        console.log(data);
        console.log(data.results)
        return data.results
    }
}

export async function getListBooks(listName) {
    const resp = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${api_key}`)
    const data = await resp.json()
    if (data.status === null) {
        console.log('retrieving data')
        return getListBooks()
    }
    else if (data.status === "OK") {
        console.log(data);
        console.log(data.results)
        return data.results.books
    }
}