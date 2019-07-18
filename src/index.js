const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection');
let addToy = false
// console.log(toyCollection);
// YOUR CODE HERE
// this adds a toy already there when pages loads
function addToys(toys) {
	for (toy of toys) {
		toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>
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
