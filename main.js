const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const search = document.getElementById("search");
const titleSearch = document.getElementById("titleSearch");
const categorySearch = document.getElementById("categorySearch");
const tbody = document.getElementById("tbody");
const deleteall = document.getElementById("deleteall");
let mode = "create";
let passId;

// Get Total

function getTotal() {
  if (price.value !== "") {
    let resutl = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = resutl;
    total.style.backgroundColor = "rgb(59, 220, 15)";
  } else {
    total.style.backgroundColor = "rgb(59, 220, 15)";
    total.innerHTML = "";
  }
}
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

// Create products

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.addEventListener("click", () => {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    discount: discount.value,
    category: category.value,
  };
  // count
  if(title.value !== "" && price.value !== "" && category.value !== ""){
    if(mode === "create"){
      if (newProduct.count > 0) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    }else{
      dataProduct[passId]= newProduct;
      submit.innerHTML = 'Create';
      mode = "create"
      count.style.display = "block";
    }
    localStorage.setItem("product", JSON.stringify(dataProduct));
    clearinputs();
    tbody.innerHTML = "";
    readData();
    getTotal()
  }
});
// clear inputs

function clearinputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  category.value = "";
  discount.value = "";
  total.innerHTML = "";
}

//  Read Data
function readData() {
  dataProduct.forEach((item, id) => {
    let datashow = `
        <tr>
        <td>${id + 1}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.taxes}</td>
        <td>${item.ads}</td>
        <td>${item.discount}</td>
        <td>${item.total}</td>
        <td>${item.category}</td>
        <td><button onclick="updatePro(${id})" id="update">update</button></td>
        <td><button onclick="delpro(${id})" id="delete">delete</button></td>
    </tr>
        `;
    tbody.innerHTML += datashow;
  });

  if (dataProduct.length > 0) {
    deleteall.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
      `;
  } else {
    deleteall.innerHTML = "";
  }
}
readData();

// Delete Product
function delpro(id) {
  dataProduct.splice(id, 1);
  localStorage.product = JSON.stringify(dataProduct);
  tbody.innerHTML = "";
  readData();
}

// Delete All Products

function deleteAll() {
  localStorage.clear();
  dataProduct = [];
  readData();
  tbody.innerHTML = "";
}

//  update data
function updatePro(id){
  let item = dataProduct[id];
  title.value = item.title;
  price.value = item.price;
  taxes.value = item.taxes;
  ads.value = item.ads;
  category.value = item.category;
  discount.value = item.discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  passId = id ;
  mode= 'update';
  scroll({
    top: 0,
    behavior: "smooth" 
  })
}

// search about data
let searchmood = 'title' ;

function getSearchMood(){
  tbody.innerHTML = '';
  search.value = '';
 if(this.id == "titleSearch"){
    searchmood = 'title';
    search.placeholder = "Search By Title"
 }else{
  searchmood = 'category';
  search.placeholder = "Search By Category"
}
search.focus();
 readData()
}
titleSearch.addEventListener("click" , getSearchMood);
categorySearch.addEventListener("click" , getSearchMood);

function searchData(){
  tbody.innerHTML = '';
  let data = this.value
  if(searchmood == 'title'){
    for(let i =0 ; i < dataProduct.length ; i++){
      let item = dataProduct[i];
      if(item.title.includes(data)){
        let datashow = `
        <tr>
        <td>${i + 1}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.taxes}</td>
        <td>${item.ads}</td>
        <td>${item.discount}</td>
        <td>${item.total}</td>
        <td>${item.category}</td>
        <td><button onclick="updatePro(${i})" id="update">update</button></td>
        <td><button onclick="delpro(${i})" id="delete">delete</button></td>
    </tr>
        `;
    tbody.innerHTML += datashow;
      }
    }
  }else{
    for(let i =0 ; i < dataProduct.length ; i++){
      let item = dataProduct[i];
      if(item.category.includes(data)){
        let datashow = `
        <tr>
        <td>${i + 1}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.taxes}</td>
        <td>${item.ads}</td>
        <td>${item.discount}</td>
        <td>${item.total}</td>
        <td>${item.category}</td>
        <td><button onclick="updatePro(${i})" id="update">update</button></td>
        <td><button onclick="delpro(${i})" id="delete">delete</button></td>
    </tr>
        `;
    tbody.innerHTML += datashow;
      }
    }
  }
}
search.addEventListener("keyup" , searchData)

