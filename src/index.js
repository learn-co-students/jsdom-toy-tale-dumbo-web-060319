const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOY_COLLECTION = document.querySelector('#toy-collection')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function slapDivOnTheDOM(id, name, image, likes) {
	let toy = document.createElement('div');
	TOY_COLLECTION.append(toy);
	toy.className = "card";
	toy.dataset.id = id;
	toy.innerHTML += `<h2>${name}</h2>
    <img src=${image} class="toy-avatar" />
    <p>${likes} Likes </p>
    <button class="like-btn">Like <3</button>`
}

//iterates through the list of toys and slaps them on the DOM
function addToys(toys) {
	for(toy of toys) {
		slapDivOnTheDOM(toy.id, toy.name, toy.image, toy.likes);
	}
}

//fetches toys from the databse
function fetchToys() {
	fetch("http://localhost:3000/toys")
	.then(res => res.json())
	.then(addToys);
}

document.addEventListener("DOMContentLoaded", event => {
	fetchToys();
});

// makes a fetch request to the database to create a toy
function createToy(form) {
	let name = form.querySelectorAll('input')[0].value;
	let image = form.querySelectorAll('input')[1].value;
	let likes = 0;
	fetch("http://localhost:3000/toys", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({name, image, likes})
	})
	.then(resp => resp.json())
	.then(toy => {slapDivOnTheDOM(toy.id, toy.name, toy.image, toy.likes)});
}

// adds a toy when the form is submitted
toyForm.addEventListener("submit", event => {
	event.preventDefault();
	createToy(event.target);
});

// updates the likes and then slaps the incremented likes on the DOM
function updateLikes(toyCard) {
	// console.log(toyCard);
	let pTag = toyCard.querySelector('p');
	let likes = parseInt(pTag.innerText.split(' ')[0]) + 1;
	fetch(`http://localhost:3000/toys/${toyCard.dataset.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({likes})
	})
	.then(data => {
		pTag.innerHTML = `${likes} Likes`
	});

}

// event for liking a toy card
TOY_COLLECTION.addEventListener("click", event => {
	if (event.target.className == "like-btn") {
		updateLikes(event.target.parentElement);
	}
});