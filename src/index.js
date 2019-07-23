const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const pageDiv = document.querySelector('#toy-collection')
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


fetch('http://localhost:3000/toys/')
.then(resp => resp.json())
.then(showToysOnDiv)

addNewToy()
addLikesWithButton()

function showToysOnDiv(data) {
  for(toy of data) {
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button id=${toy.id} class="like-btn">Like <3</button>
    `
    pageDiv.append(cardDiv)
    // console.log(toy)
  }
}

function addNewToy() {
  const newToyButtonName = document.querySelector('input[name= "name"]');
  const newToyButtonImage = document.querySelector('input[name= "image"]');

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    fetch(`http://localhost:3000/toys/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${newToyButtonName.value}`,
        "image": `${newToyButtonImage.value}`,
        "likes": "0"
      })
    })
    .then(resp => resp.json())
    .then(function(data){
      const cardDiv = document.createElement('div')
      cardDiv.className = 'card'
      cardDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.image}" class="toy-avatar" />
      <p>${data.likes}Likes</p>
      <button id=${data.id} class="like-btn">Like <3</button>
    `
      pageDiv.append(cardDiv)
    })
  })
}

// addLikesWithButton()

function addLikesWithButton() {
  
  pageDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-btn')) {
      // const cardDiv = pageDiv.querySelector('.card')
      let cardP = event.target.parentElement.querySelector('p')
      let number = parseInt(cardP.innerText.split(" ")[0])
            // debugger
      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': `${number + 1}`
        })
      })
      .then(resp => resp.json())
      .then(function() {
        cardP.innerText = `${++number} Likes`
      })
    }
  })
}

//1. fix your consts - try to only grab and assign once 
//2. try putting them at the top all together so you can reference them all together, afterwards you can refactor to grab them only in lower scopes if you need
//3. Likes: <span>${ num }</span>
// ^^ do that (it makes it way easier to update a number without [0])
// add a dataset id to the span (toy-like-btn-${ toy.id })