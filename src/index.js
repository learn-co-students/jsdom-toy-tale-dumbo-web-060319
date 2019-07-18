const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const collection = document.querySelector("#toy-collection");
const form = document.querySelector(".add-toy-form");

// YOUR CODE HERE

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

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => createCollection(data));
};



function createCollection(data) {
  data.forEach(function(toy){


    displayindi(toy)

  })
};


// OR HERE!
document.addEventListener("DOMContentLoaded", function(){
  fetchToys();
  
});

form.addEventListener("submit", function(event){
  
  event.preventDefault()
  
  const name = event.target.name.value;
  const image = event.target.image.value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    body: JSON.stringify({
      name: name,
      image:image,
      likes: 0
    })
  }).then(response => response.json())
    .then(function data(toy){
      displayindi(toy)
    })
});



function displayindi(toy){
    let card = document.createElement("div");
    card.className = "card";
    let name = card.appendChild(document.createElement("h2"));
    let image = card.appendChild(document.createElement("img"));
    let likes = card.appendChild(document.createElement("p"));
    let button = card.appendChild(document.createElement("button"));
    name.innerText = toy.name;
    image.src = toy.image;
    image.className = "toy-avatar";
    likes.innerText = toy.likes;
    button.className = "like";
    card.dataset.newCardId = toy.id;

    addLike(button,toy.id);

    collection.append(card); 
}

function addLike(button,id) {
  button.addEventListener("click", function() {
    patchLike(button,id)
  })
}

function patchLike(button,id) {
  let card = button.parentNode
  let likenow = parseInt(card.querySelector("p").innerText)
  console.log(likenow)

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      body: JSON.stringify({
        likes: likenow+1
      })
    }).then(resp => resp.json())
    .then(function updatelike(data){
      card.querySelector("p").innerText=data.likes
    })
   
 }

