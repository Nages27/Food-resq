// ======== Donations ========
let donations = JSON.parse(localStorage.getItem("donations")) || [];

// Submit donation form
document.getElementById("donationForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const donation = {
    foodType: document.getElementById("foodType").value,
    quantity: document.getElementById("quantity").value,
    location: document.getElementById("location").value,
    trust: document.getElementById("trust").value,
    contact: document.getElementById("contact").value,
    category: document.getElementById("category").value,
    image: "images/food-card.jpg" // default food image
  };
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));
  alert("Donation added successfully!");
  this.reset();
  displayDonations();
});

// Display donations
function displayDonations(list=donations){
  const foodList = document.getElementById("foodList");
  if(foodList){
    foodList.innerHTML = "";
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "food-card";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.foodType}" class="food-img">
        <h3>${item.foodType}</h3>
        <p>Quantity: ${item.quantity} people</p>
        <p>Location: ${item.location}</p>
        <p>Trust: ${item.trust || "N/A"}</p>
        <p>Contact: ${item.contact}</p>
        <p>Category: <span class="status ${item.category.toLowerCase()}">${item.category}</span></p>
      `;
      div.addEventListener("click", () => alert(`
        Food: ${item.foodType}
        Quantity: ${item.quantity}
        Location: ${item.location}
        Trust: ${item.trust || "N/A"}
        Contact: ${item.contact}
        Category: ${item.category}
      `));
      foodList.appendChild(div);
    });
  }
}
displayDonations();

// ======== Search & Filter for donations ========
const searchInput = document.getElementById("searchInput");
searchInput?.addEventListener("input", function(){
  const query = this.value.toLowerCase();
  displayDonations(donations.filter(d => 
    d.foodType.toLowerCase().includes(query) ||
    d.location.toLowerCase().includes(query) ||
    d.category.toLowerCase().includes(query)
  ));
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.category;
    if(cat==="all") displayDonations();
    else displayDonations(donations.filter(d=>d.category.toLowerCase()===cat));
  });
});

// ======== Selling Food ========
let sells = JSON.parse(localStorage.getItem("sells")) || [];

document.getElementById("sellForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const sellItem = {
    foodType: document.getElementById("sellFoodType").value,
    quantity: document.getElementById("sellQuantity").value,
    location: document.getElementById("sellLocation").value,
    contact: document.getElementById("sellContact").value,
    expiry: document.getElementById("sellExpiry").value,
    price: document.getElementById("sellPrice").value,
    image: "images/sell-food.jpg" // default sell image
  };
  sells.push(sellItem);
  localStorage.setItem("sells", JSON.stringify(sells));
  alert("Food listed for sale successfully!");
  this.reset();
  displaySells();
});

// Display sells
function displaySells(list=sells){
  const sellList = document.getElementById("sellList");
  if(sellList){
    sellList.innerHTML = "";
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "food-card";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.foodType}" class="food-img">
        <h3>${item.foodType}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Location: ${item.location}</p>
        <p>Contact: ${item.contact}</p>
        <p>Expiry: ${item.expiry}</p>
        <p>Price: ${item.price ? item.price : "Free / Negotiable"}</p>
      `;
      div.addEventListener("click", () => alert(`
        Food: ${item.foodType}
        Quantity: ${item.quantity}
        Location: ${item.location}
        Contact: ${item.contact}
        Expiry: ${item.expiry}
        Price: ${item.price ? item.price : "Free / Negotiable"}
      `));
      sellList.appendChild(div);
    });
  }
}
displaySells();
