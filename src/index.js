  // const likeBtn = document.querySelector(".like-btn")

  // const addBtn = document.querySelector('#new-toy-btn')
  // const toyForm = document.querySelector('.container')
  // let addToy = false

  // document.addEventListener("DOMContentLoaded", function(e) {
  //   fetch("http://localhost:3000/toys")
  //   .then(response => response.json())
  //   .then(renderToys)
    
  // })
  // // YOUR CODE HERE





  // // OR HERE!

  

  // configObj2 = {
  //   method: "PATCH",
  //   headers: 
  //   {
  //     "Content-Type": "application/json",
  //     Accept: "application/json"
  //   },
    
  //   body: JSON.stringify({
  //     "likes": 1
  //   })
    
  // }


  // const likesData = {
    
  // }



  // const toyCollection = document.getElementById('toy-collection')
  //   function renderToys(toys) {
  //     toyCollection.innerHTML = ""
  //     toys.forEach(function (toy) {
  //       toyCollection.innerHTML += `
  //      <div class="card" data-id=${toy.id}>
  //           <h2>${toy.name}</h2>
  //           <img src="${toy.image}" class="toy-avatar" />
  //           <p>${toy.likes} Likes</p>
  //           <button class="like-btn">Like <3</button>
  //           <button class="delete-btn">Delete</button>
  //      </div>
  //     `
  //     })
  //   }

  // function createToy(json) {
  //   let collection = document.querySelector("#toy-collection")
  //   let div = document.createElement("div")

  //   div.classList.add("card")

  //   div.innerHTML = 
  //   `<h2>${json.name}</h2>
  //   <img src=${json.image} class="toy-avatar" />
  //   <p> Likes: ${json.likes} </p>
  //   <button class="like-btn">Like 💖</button>`


  //   collection.append(div) 



  //   likeBtn.addEventListener("click", function(e) {
  //     console.log(e.target)
  //     fetch(`http://localhost:3000/toys/${json.id}`, configObj2)
  //     .then(response => response.json())
  //     .then(addLikes) 
  //   })
    
  // }

document.addEventListener("DOMContentLoaded", function(e) {
  const likeBtn = document.querySelector(".like-btn")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false


  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(renderToys)


  function renderToys(toys) {
    
    const mainDiv = document.querySelector("#toy-collection")
    toys.forEach(toy => {
      let cardDiv = document.createElement("div")
      cardDiv.className = "card"
      cardDiv.id = `toy-${toy.id}`
      cardDiv.innerHTML = `
      
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> <span> ${toy.likes} </span> likes</p>
      <button data-like-id=${toy.id} class="like-btn">Like ❀</button>
      <button data-id=${toy.id} class="delete-btn">Donate 😢</button>
      ` 
      mainDiv.append(cardDiv)
    })
    
    
    const collection = document.querySelector("#toy-collection")
      collection.addEventListener("click", function(e) {
        if (e.target.className === 'like-btn'){
          likeButton(e.target)
        } else if (e.target.className === 'delete-btn') {
          deleteButton(e.target)
        } else {
          console.log("nothing")
        }
        
      })

      function deleteButton(target) {
        console.log(target)
        let id = parseInt(target.dataset.id)
        let toyCard = target.parentNode

        fetch(`http://localhost:3000/toys/${id}`, {
          method: "DELETE"
        }).then(response => response.json())
          .then(toyCard.remove())
      }

      function likeButton(target) {
        let id = parseInt(target.dataset.likeId)
        let toyCard = target.parentNode
        let span = toyCard.querySelector("span")
        numOfLikes = parseInt(span.innerText)
        
        fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json",
                      "Accept": "application/json"},
          body: JSON.stringify({
            likes: numOfLikes + 1
          })
        }).then(response => response.json())
          .then(updateLikes)

          function updateLikes(data) {
            console.log(data)
            console.log(span.innerText)
            span.innerText = data.likes 
          }
      }
    
  }

 
  
    
  // let toyId = parseInt(e.target.dataset.id)
  // console.log(toyId)
  
  // fetch(`http://localhost:3000/toys/${toyId}`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(response => response.json())
  //   .then(
  //     document.querySelector(`#toy-${toyId}`).remove()
  //   )




  
  addBtn.addEventListener('click', function(e) {
    
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.addEventListener("submit", function(e) {
        e.preventDefault()
        console.log(e)
        const toyName = e.target.name.value
        const toyUrl = e.target.image.value 
        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: { "Content-Type": "application/json",
          "Accept": "application/json" },
          body: JSON.stringify({
            name: toyName,
             image: toyUrl,
             likes: 0
          })
        })
        .then(response => response.json())
        .then(createToy)
      })
    } else {
      toyForm.style.display = 'none'
    }
    
  })
  
  
  function createToy(toy) {
    console.log(toy)
    const mainDiv = document.querySelector("#toy-collection")
      let cardDiv = document.createElement("div")
      cardDiv.className = "card"
      cardDiv.id = `toy-${toy.id}`
      cardDiv.innerHTML = `

              <h2>${toy.name}</h2>
              <img src=${toy.image} class="toy-avatar" />
              <p> <span> ${toy.likes} </span> likes</p>
              <button data-like-id=${toy.id} class="like-btn">Like ❀</button>
              <button data-id=${toy.id} class="delete-btn">Donate 😢</button>
                     ` 
      mainDiv.append(cardDiv)
      
  }



})
