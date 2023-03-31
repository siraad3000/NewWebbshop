"use strict"

//-----GET---------
//Retrive the data from firebase to get all the orders
///HTML-element
const renEl = document.getElementById("ren")
const send2El = document.getElementById("send2")
const productIdEl = document.getElementById("productId")
const newUsernameEl = document.getElementById("newUsername")
const newEmailEl = document.getElementById("newEmail")
const newAdressEl = document.getElementById("newAdress")
const newShippingEl = document.getElementById("newShipping")

fetch(
  "https://firestore.googleapis.com/v1/projects/webbshop-demo/databases/(default)/documents/orders"
)
  .then((res) => res.json())
  .then((data) => getOrders(data))

function getOrders(data) {
  let orderArray = data.documents

  for (let user of orderArray) {
    console.log(user.fields.adress.stringValue)
    console.log(user.fields.email.stringValue)
    console.log(user.fields.id.integerValue)
    console.log(user.fields.shipping.stringValue)

    renEl.innerHTML += `
        <article>   
            <p > Id : ${user.fields.id.integerValue}</p>
            <p> Name: ${user.fields.username.stringValue}</p>
            <p> Adress: ${user.fields.adress.stringValue}</p>
            <p> E-mail: ${user.fields.email.stringValue}</p>
            <p> Shipping-terms: ${user.fields.shipping.stringValue}</p>
            <button class ="btn btn-danger"onclick ="deleteOrder('${user.name}')">Delete order</button>
            <button class="btn btn-info"onClick ="updateOrder('${user.name}')">Update order</button>
            <br>
            <hr>
        </article>

        `
  }
}

function deleteOrder(name) {
  fetch("https://firestore.googleapis.com/v1/" + name, {
    method: "DELETE",
  })

  setTimeout(() => {
    document.location.reload()
  }, 2000)
}

function updateOrder(name) {
  console.log("order updated")
  let productId = productIdEl.value
  let newUsername = newUsernameEl.value
  let newEmail = newEmailEl.value
  let newAdress = newAdressEl.value
  let newShipping = newShippingEl.value

  let body = JSON.stringify({
    fields: {
      id: {
        integerValue: productId,
      },
      username: {
        stringValue: newUsername,
      },
      email: {
        stringValue: newEmail,
      },
      adress: {
        stringValue: newAdress,
      },
      shipping: {
        stringValue: newShipping,
      },
    },
  })

  fetch("https://firestore.googleapis.com/v1/" + name, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
  alert("Uppdaterad")

  setTimeout(() => {
    document.location.reload()
  }, 2000)
}
