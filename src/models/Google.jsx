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

export function getBookshelves(token) {
    fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${googleAPI.api_key}`, {
        headers: {
            "Authentication": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.items
        });
}

export function getBooksFromShelf(shelf, token) {
    fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf}/volumes?key=${googleAPI.api_key}`, {
        headers: {
            "Authentication": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.items
        });
}

export function addBookToShelf(shelf, bookID, token) {
    fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf}/addVolume?volumeId=${bookID}&key=${googleAPI.api_key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        },
    })
}

export function removeBookFromShelf(shelf, bookID, token) {
    fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf}/removeVolume?volumeId=${bookID}&key=${googleAPI.api_key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        },
    })
}

export function searchBookByISBN(isbn) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}?key=${googleAPI.api_key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.items
        });
}

export function searchBookByName(bookName) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}?key=${googleAPI.api_key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.items
        });
}