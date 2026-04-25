let products = [
  {name:"SCS Glow Mask", price:1500, image:"images.jfif"},
  {name:"Star Beauty Soap", price:500, image:"b.jfif"},
  {name:"Slim Pro Syrup", price:1735, image:"syrup.jfif"},
  {name:"Acne Gel Mask", price:1500, image:"c.jfif"},
  {name:"Face Wash", price:1000, image:"x.jfif"},
  {name:"Hair Oil", price:1453, image:"qq.jfif"},
  {name:"Lip Scrub", price:650, image:"lp.jfif"},
  {name:"Skin Polish", price:700, image:"ll.jfif"},
  {name:"Lip Balm", price:260, image:"l.jfif"},
  {name:"Mud Mask", price:570, image:"f.jfif"},
  {name:"Hand Cream", price:739, image:"xx.jfif"}
];

let cart = [];

// SHOW PRODUCTS
function displayProducts(list){
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} Rs</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts(products);

// ADD CART
function addToCart(index){
  let item = products[index];
  let found = cart.find(p=>p.name===item.name);

  if(found){
    found.qty++;
  }else{
    cart.push({...item, qty:1});
  }

  updateCart();
}

// UPDATE CART
function updateCart(){
  let list = document.getElementById("cartList");
  list.innerHTML = "";

  let total = 0;

  cart.forEach((item,i)=>{
    total += item.price * item.qty;

    list.innerHTML += `
      <li>
        ${item.name} x${item.qty} = ${item.price*item.qty} Rs
        <br>
        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="changeQty(${i},-1)">-</button>
        <button onclick="removeItem(${i})">X</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = "Total: " + total + " Rs";
}

// CHANGE QTY
function changeQty(i,change){
  cart[i].qty += change;
  if(cart[i].qty<=0) cart.splice(i,1);
  updateCart();
}

// REMOVE
function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

// SEARCH
function searchProduct() {
  let value = document.getElementById("search").value.toLowerCase();

  if(value === ""){
    displayProducts(products);
    return;
  }

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}

// CHECKOUT
function payNow(){
  if(cart.length===0){
    alert("Cart is empty!");
    return;
  }

  document.getElementById("formBox").classList.remove("hidden");
}

// CONFIRM
function confirmOrder(){
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  document.getElementById("formBox").classList.add("hidden");
}

// WHATSAPP
function sendWhatsApp(){
  let msg = "Order Details:%0A";
  let total = 0;

  cart.forEach(i=>{
    msg += `${i.name} x${i.qty} = ${i.price*i.qty} Rs%0A`;
    total += i.price*i.qty;
  });

  msg += "Total: " + total + " Rs";

  msg += "%0AName: "+document.getElementById("name").value;
  msg += "%0APhone: "+document.getElementById("phone").value;
  msg += "%0AAddress: "+document.getElementById("address").value;
  msg += "%0ATXID: "+document.getElementById("txid").value;

  window.open("https://wa.me/923180498038?text="+msg);
}