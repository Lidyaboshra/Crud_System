let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");

let mood = "create";
let temp;
// Get Total Price
function getTotal() {
  if (price.value != 0 && taxes.value != 0 && ads.value != 0) {
    let sum = +price.value + +taxes.value + +ads.value;
    let result = sum - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "0";
    total.style.background = "#a00d02";
  }
}
// Create Product
let dataPro;
if (localStorage.getItem("products")) {
  dataPro = JSON.parse(localStorage.getItem("products"));
  showData();
} else {
  dataPro = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && newPro.count < 100) {
    if (mood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "Create";
    }
    clearData();
  }

  localStorage.setItem("products", JSON.stringify(dataPro));
  showData();
};

// Clear Inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read Data
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
           <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick=updateDate(${i})>Update</button></td>
              <td><button onclick=deleteData(${i})>Delete</button></td>
            </tr>
    
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick=daleteAll()>Delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

// Delete Data
function deleteData(index) {
  dataPro.splice(index, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
}

// Delete All

function daleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

function updateDate(index) {
  title.value = dataPro[index].title;
  price.value = dataPro[index].price;
  taxes.value = dataPro[index].taxes;
  ads.value = dataPro[index].ads;
  discount.value = dataPro[index].discount;
  getTotal();
  category.value = dataPro[index].category;
  console.log(document.getElementsByClassName("price"));
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let moodSearch = "title";
function getSearchType(id) {
  if (id == "searchtitle") {
    moodSearch = "title";
  } else {
    moodSearch = "category";
  }
  let search = document.getElementById("search");
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (moodSearch == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
           <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick=updateDate(${i})>Update</button></td>
              <td><button onclick=deleteData(${i})>Delete</button></td>
            </tr>
    
    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
           <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick=updateDate(${i})>Update</button></td>
              <td><button onclick=deleteData(${i})>Delete</button></td>
            </tr>
    
    `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
