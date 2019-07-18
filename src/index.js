const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection');
const addToyForm = document.querySelector('.add-toy-form');
// console.log(addToyForm);
let addToy = false
// console.log(toyCollection);
// YOUR CODE HERE
// this adds a toy already there when pages loads

function addToys(toys) {
	for (toy of toys) {
		// console.log(toy);
		toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button data-id= "${toy.id}" class="like-btn">Like <3</button>
  </div>`
	}
}

fetchToys();
// grabs the toys from the localhost api
function fetchToys() {
	fetch('http://localhost:3000/toys')
	.then(resp => resp.json())
	.then(addToys);
}

function createToy() {
	fetch('http://localhost:3000/toys', {
		method: "POST",
		headers:
		{
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			"name": event.target.name.value,
			"image": event.target.image.value,
			"likes": 0
		})
	})
	.then(resp => resp.json())
	.then(addToys);
}

addToyForm.addEventListener("submit", event => {
	// let name = event.target.name.value;
	// let image = event.target.image.value;
	createToy();
});

toyCollection.addEventListener('click', event => {
	if (event.target.className === "like-btn") {
		let id = event.target.dataset.id
		let like = event.target.previousElementSibling;
		let likeCount = parseInt(like.innerText);
		like.innerText = `${++likeCount}`;

		fetch(`http://localhost:3000/toys/${id}`, {
			method: "PATCH",
			headers:
			{
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				"likes": likeCount
			})
		})
		.then(resp => resp.json())
	}
})


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


// OR HERE!
