document.addEventListener("DOMContentLoaded", init)
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const likeBtn = document.querySelector(".like-btn")

function init(){
  console.log('working')
  getToys()
  // const likeBtn = document.querySelector(".like-btn")

}

let addToy = false

// YOUR CODE HERE

/// FETCH TOYS \\\
function getToys(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => renderManyToys(toys))
  }

  function renderManyToys(toys){
    toys.forEach(toy => {
    //for each all these toys 
    renderOneToy(toy)
    })
  }
/// RENDER TOYS \\\
function renderOneToy(toy){
  // debugger
  // return toys.forEach(toy => {
  //   console.log(toy)
    const newDiv = document.createElement("div")
    newDiv.classList.add("card")
    const toyName = document.createElement("h2")
    const toyImage = document.createElement("img")
    const toyLikes = document.createElement("p")
    toyLikes.classList.add("number-of-likes")
    const likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")


    toyName.innerText = toy.name
    toyImage.src = toy.image;
    toyImage.classList.add("toy-avatar")
    let toyLikesNum = parseInt(toy.likes)

    newDiv.append(toyName)
    newDiv.append(toyImage)
    newDiv.append(toyLikes)
    toyLikes.innerHTML = `Likes: <span class='like-span'>${toyLikesNum}</span>`
    likeButton.innerText = "Like <3"
    likeButton.dataset.id = toy.id

    // sends to update function
    likeButton.addEventListener("click", updateLikes)


    newDiv.append(likeButton)

    toyCollection.append(newDiv)
}

/// POST TOYS \\\

const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", function(event){
  event.preventDefault();
  // console.log(event)
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      {
        "name": event.target.name.value,
        "image": event.target.image.value,
        "likes": 0 
      }
    ),

  })
  .then(resp => resp.json())
  .then(toy => renderOneToy(toy))
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

let counter = 0
function updateLikes(event){

  const id = event.target.dataset.id
  counter += 1
  let numOfLikes = event.target.previousElementSibling.innerText
  let arrayOfLikes = numOfLikes.split(" ")
  let stringOfLikes = arrayOfLikes[1]
  let likesAsNum = parseInt(stringOfLikes)
  likesAsNum += 1

  fetch(`http://localhost:3000/toys/${ id }`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(
    {
      "likes": `${likesAsNum}`
    })
  })
  .then(response => response.json())
  
}

