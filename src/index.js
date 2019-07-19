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

const list = document.querySelector('#toy-collection');

function displayToys(event) {
  event.forEach(function(toy){
    const div = document.createElement('div');
    div.className = 'card';
    div.id=`id-${toy.id}`
    const h2 = document.createElement('h2');
    h2.innerText = toy.name;
    div.innerHTML = `<img src="${toy.image}" class="toy-avatar"> <button type='button' class='like-btn'>Like</button>`;
    const p = document.createElement('p');
    p.innerText = toy.likes;
    div.append(p);
    div.append(h2);
    list.append(div);
    let button= p.parentNode.querySelector("button")

    likeevent(button)

  })
}


// OR HERE!

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then (displayToys)

            function rickandmorty(name, image){
            fetch("http://localhost:3000/toys",{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
              },
              body:
              JSON.stringify({
                "name": `${name}`,
                "image": `${image}`,
                "likes": 0
              })
            }).then(promise => promise.json())
            .then(data => console.log(data))

            }

const form = document.querySelector('form');

function createNewToy() {
  
}

form.addEventListener("submit",function(event){
  console.log("richard")
 
  const div = document.createElement('div');
  div.className = 'card';
  const h2 = document.createElement('h2');
  h2.innerText = form.name.value;
  div.innerHTML = `<img src="${form.image.value}" class="toy-avatar"> <p>${0}</p> <button type='button' class='like-btn'>Like</button>`;
  div.append(h2);
  list.append(div);
  event.preventDefault()
  rickandmorty(form.name.value, form.image.value)
  let button =h2.parentNode.querySelector("button")
    likeevent(button)
})


function likeevent(button) {
  button.addEventListener("click",function(){
    increaselike(button.parentNode.id.split("-")[1])
  })
}



function increaselike(id){
  let likenow = parseInt(document.querySelector(`#id-${id}`).querySelector("p").innerText)
  
  fetch("http://localhost:3000/toys/"+id,{
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
      "Accept": "application/json"
    },
    body:
    JSON.stringify({
      "likes": `${likenow+1}`
    })
  }).then(response => response.json())
  .then(function (data){
    updatingLike(id,likenow)})


  // .then(response => response.json())
  // .then(console.log(data))

}

function updatingLike(id,likenow) {
 document.querySelector(`#id-${id}`).querySelector("p").innerText=likenow+1
}