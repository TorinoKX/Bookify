import googleAPI from '../data/googleAPI.json'

/*
* Create form to request access token from Google's OAuth 2.0 server.
*/
export function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': googleAPI.web.client_id,
        'redirect_uri': googleAPI.web.redirect_uri,
        'response_type': 'token',
        'scope': googleAPI.web.scope,
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

export async function getBookshelves(token) {
    const resp = await fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/mylibrary/bookshelves?key=`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await resp.json();
    console.log(data)
    if (!data.items) {
        console.log('retrieving data')
        return []
    }
    else {
        console.log(data);
        console.log(data.items)
        return data.items || []
    }
}

export async function getBooksFromShelf(shelf, token) {
    const resp = await fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/mylibrary/bookshelves/${shelf}/volumes?key=`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await resp.json();
    console.log(data)
    if (!data.totalItems) {
        console.log('Could not retrieve items')
        return []
    }
    else {
        console.log(data);
        console.log(data.items)
        return data.items || []
    }
}

export function addBookToShelf(shelf, bookID, token) {
    fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/mylibrary/bookshelves/${shelf}/addVolume?volumeId=${bookID}&key=`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export function removeBookFromShelf(shelf, bookID, token) {
    fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/mylibrary/bookshelves/${shelf}/removeVolume?volumeId=${bookID}&key=`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export async function searchBookByISBN(isbn) {
    const resp = await fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/volumes?q=isbn:${isbn}&key=`);
    const data = await resp.json();
    if (data.status === null) {
        console.log('retrieving data')
        return searchBookByISBN(isbn)
    }
    else if (data.status === "OK") {
        console.log(data);
        console.log(data.items)
        return data.items
    }
}

export async function searchBookByName(bookName) {
    const resp = await fetch(`https://s5038261.elf.ict.griffith.edu.au:3001/gbooks/volumes?q=${bookName}&key=`);
    const data = await resp.json();
    if (!data.items) {
        console.log('Could not retrieve items')
        console.log(data)
        return []
    }
    else {
        console.log(data);
        console.log(data.items)
        return data.items || []
    }
}