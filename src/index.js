const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const collection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')

// YOUR CODE HERE
function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(createCollection);
}

function imageLiked(event){
  const id = event.target.dataset.imageId;

  let pLikes = parseInt(event.target.parentNode.querySelector(".p-likes").innerText);
  pLikes++;
  
  fetch("http://localhost:3000/toys/" + id, {
    "method": "PATCH",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({
      "likes": pLikes
    })
  }).then(function(){
    event.target.parentNode.querySelector(".p-likes").innerText = pLikes;
  })
}

function createDivCard(cardItem) {
  const card = document.createElement("div");
  card.id = "card-item-" + cardItem.id;
  card.className = "card";
  card.innerHTML = `
    <h2 card-id="name">${cardItem.name}</h2>
    <img class="toy-avatar" src = ${cardItem.image} >
    <p class="p-likes">${cardItem.likes}</p>
    <button data-image-id="${ cardItem.id }" class="like"><i class="fas fa-heart"></i></button>
  `
  const btnLike = card.querySelector(".like");
  btnLike.addEventListener("click", imageLiked);
    
  card.addEventListener("contextmenu", function(event){
    cardRightClicked(event, cardItem.id)
  })

  return card;
}

function createCollection(response){
  response.forEach((cardItem) => {
    collection.append(createDivCard(cardItem))
  })
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


function cardRightClicked(event, id){
  event.preventDefault()

  const card = event.currentTarget;

  fetch('http://localhost:3000/toys/' + id, {
    method: "DELETE"
  }).then(res => res.json())
  .then(() => {
    card.remove()
  })
}


// OR HERE!

document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
  event.preventDefault()
})

// ----- CREATE NEW TOY ----- //

form.addEventListener('submit', function(event) {

  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value

  
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
  console.log(name)
})
