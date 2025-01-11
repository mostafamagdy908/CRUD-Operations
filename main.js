let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let ceart = document.getElementById('cearte');
let count = document.getElementById('count');
let category = document.getElementById('category');

let mode = 'cerate';
let temp;

function GetTotal() {
  if (price.value != '') {
    let resualt = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = resualt;
    total.style.backgroundColor = 'green';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = 'red';
  }
}

//create data//
let datapro;
if (localStorage.prodauct != null) {
  datapro = JSON.parse(localStorage.prodauct);
} else {
  datapro = [];
}
ceart.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newpro.count < 99
  ) {
    if (mode === 'cerate') {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mode = 'create';
      ceart.innerHTML = 'create';
      count.style.display = 'block';
    }
    cleardata();
  }

  localStorage.setItem('prodauct', JSON.stringify(datapro));
  showData();
  cleardata();
};

function cleardata() {
  title.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  price.value = '';
  total.innerHTML = '';
  total.style.backgroundColor = 'red';
}

function showData() {
  GetTotal();
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
     <tr>
          <td>${i + 1}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updateData(${i})" id="updeat"><i class="fa-regular fa-pen-to-square"></i></button></td>
            <td><button onclick="deletpro(${i})" id="dele"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>

    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btndeletall = document.getElementById('deleteAll');
  if (datapro.length > 0) {
    btndeletall.innerHTML = `
            <button onclick="btndeleteall()">deleteAll(${datapro.length})</button>

    `;
  } else {
    btndeletall.innerHTML = '';
  }
}
showData();

function deletpro(i) {
  datapro.splice(i, 1);

  localStorage.product = JSON.stringify(datapro);
  showData();
}

function btndeleteall() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

function updateData(i) {
  title.value = datapro[i].title;
  ads.value = datapro[i].ads;
  taxes.value = datapro[i].taxes;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  price.value = datapro[i].price;
  GetTotal();
  count.style.display = 'none';
  ceart.innerHTML = 'update';
  mode = 'update';
  temp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}
let searchMode = 'title';

function getsearch(id) {
  let serchh = document.getElementById('search');
  if (id == 'searchtitle') {
    searchMode = 'title';
    // serchh.placeholder= "Search By Title"
  } else {
    searchMode = 'category';
    // serchh.placeholder= "Search By Category"
  }
  serchh.placeholder = 'Search By ' + searchMode;

  serchh.focus();
  serchh.value = '';
  showData();
}

function search(value) {
  let table = '';
  if (searchMode == 'title') {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
             <td>${i}</td>
             <td>${datapro[i].title}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td><button onclick="updateData(${i})" id="updeat"><i class="fa-regular fa-pen-to-square"></i></button></td>
               <td><button onclick="deletpro(${i})" id="dele"><i class="fa-regular fa-trash-can"></i></button></td>
           </tr>

       `;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
             <td>${i}</td>
             <td>${datapro[i].title}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td><button onclick="updateData(${i})" id="updeat"><i class="fa-regular fa-pen-to-square"></i></button></td>
               <td><button onclick="deletpro(${i})" id="dele"><i class="fa-regular fa-trash-can"></i></button></td>
           </tr>

       `;
      }
    }
  }

  document.getElementById('tbody').innerHTML = table;
}

const lnkstyle = document.getElementById('lnkstyle');
function StyleSheet(page) {
  lnkstyle.setAttribute('href', page);
}

$('#darck').click(function () {
  $('#darck').hide();
  $('#light').show();
})

$('#light').click(function () {
  $('#light').hide();
  $('#darck').show();
})
