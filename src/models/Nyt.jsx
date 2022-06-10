
export async function getLists() {
	const resp = await fetch('https://localhost:3001/nyt/lists/names.json?api-key=');
	const data = await resp.json();
	if (data.status === null) {
		console.log('retrieving data');
		return getLists();
	}
	else if (data.status === 'OK') {
		console.log(data);
		console.log(data.results);
		return data.results;
	}
}

export async function getListBooks(listName) {
	const resp = await fetch(`https://localhost:3001/nyt/lists/current/${listName}.json?api-key=`);
	const data = await resp.json();
	if (data.status === null) {
		console.log('retrieving data');
		return getListBooks();
	}
	else if (data.status === 'OK') {
		console.log(data);
		console.log(data.results);
		return data.results.books;
	}
}