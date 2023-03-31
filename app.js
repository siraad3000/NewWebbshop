"use strict"

const proEl = document.getElementById("pro")
const buyEl = document.getElementById("buy")
const sendEl = document.getElementById("send")
const usernameEl = document.getElementById("username")
const emailEl = document.getElementById("email")
const adressEl = document.getElementById("adress")
const shippingEl = document.getElementById("shipping")
const formEl = document.getElementById("form")
const inputEl = document.getElementById("input")

//-----GET------
//Hämta ut alla produkter med get anrop
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => renData(data))

function renData(data) {
  //Skapar en variabel för datan
  let webbshopArray = data

  //Det sker en itrering för varje prdukt och lägger till nästa produkt typ en (foreach loop)
  for (let products of webbshopArray) {
    proEl.innerHTML += `
        <article class = "items">
            <h2 class = "title">${products.title}</h2>
            <br>
            <p>${products.id}</p>
            <br>
            <p> Description: ${products.description}</p>
            <br>
            <p class = "price"> Price: ${products.price}</p>
            <br>
            <p class="rate"> Rating: ${JSON.stringify(products.rating)}</p>
            <br>
            <img src = '${products.image}' alt= '' width = "150" class="image">
            <button class ="btn btn-success" onClick ="window.location.href ='form.html'; saveData(${
              products.id
            }, ${products.price})" >Buy product </button>
            <hr>
        </article>
        <br>
        `
    console.log(products)
  }
}
//Localstorage lagara data om id och pris
function saveData(id, price) {
  let obj = {
    id: id,
    price: price,
  }

  let myObj = JSON.stringify(obj)
  localStorage.setItem("cart", myObj)
}

//Formuläret för inte postats om den är tom
form.addEventListener("input", () => {
  if (
    usernameEl.value != "" &&
    emailEl.value != "" &&
    adressEl.value != "" &&
    shippingEl.value != ""
  ) {
    sendEl.removeAttribute("disabled", "disabled")
  } else {
    sendEl.setAttribute("disabled", "disabled")
  }
})

//-----POST-----------

function postOrder() {
  let username = usernameEl.value
  let email = emailEl.value
  let adress = adressEl.value
  let shipping = shippingEl.value

  //Hämtar info som är sparad på localstorage
  let json = localStorage.getItem("cart")
  let object = JSON.parse(json)

  let id = object.id
  let price = object.price

  //Fälten som ska va med i posten skrivet i rätt format
  let body = JSON.stringify({
    fields: {
      id: {
        integerValue: id,
      },
      price: {
        doubleValue: price,
      },
      username: {
        stringValue: username,
      },
      email: {
        stringValue: email,
      },
      adress: {
        stringValue: adress,
      },
      shipping: {
        stringValue: shipping,
      },
    },
  })

  fetch(
    "https://firestore.googleapis.com/v1/projects/webbshop-demo/databases/(default)/documents/orders",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    }
  )
    .then((res) => res.json())
    .then((data) => getOrders(data))
  alert("Postad")
}
