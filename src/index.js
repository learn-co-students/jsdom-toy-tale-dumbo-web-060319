const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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
// -------------------------READ----------------------------
function createToy(toy){
  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  cardDiv.id = `toy${toy.id}`
  cardDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button class="like-btn" data-button-id="">Like <3</button>
  `
  let button = cardDiv.querySelector('.like-btn')
  let id = toy.id
  button.dataset.buttonId = id
  button.addEventListener('click', event =>{
    updateLikes(event)
  })
  return cardDiv;
}

function renderToys(data) {
  const div = document.querySelector('#toy-collection')
  data.forEach(toy => {
  div.append(createToy(toy))
  })
}

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(renderToys)

// -------------------------CREATE----------------------------

  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    const nameField = event.target.name.value
    const imageField = event.target.image.value
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },

      body: JSON.stringify ({
        name: nameField,
        image: imageField,
        likes: 0
      })
    }).then(response => response.json())
      .then(data => {
        const div = document.querySelector('#toy-collection')
        div.append(createToy(data))
      })
  })

  // -------------------------UPDATE----------------------------
    // - when clicked make a patch
    // - specify likes
    // - make a method to 

  function updateLikes(event){
    const div = event.target.parentElement
    const p = div.querySelector('p')
    let currentLikes = parseInt(p.innerText.split(' ')[0])
    let id = parseInt(event.target.dataset.buttonId)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        //  Accept: 'application/json'
      },

      body: JSON.stringify ({
        likes: currentLikes + 1
      })
    }).then(response => response.json())
      .then(data => {
        const div = document.querySelector(`#toy${data.id}`)
        const p = div.querySelector('p')
        p.innerText = `${data.likes} likes`
      })
  }

// OR HERE!
