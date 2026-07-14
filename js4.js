let title = document.getElementById('title');
let inputs = document.querySelector('.price');
let price = document.getElementById('price');
let Taxis = document.getElementById('Taxis');
let Ads = document.getElementById('Ads');
let Discount = document.getElementById('Discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let Category = document.getElementById('Category');
let btn = document.getElementById('btn');
let search = document.getElementById('search');

let mode = 'create';
let tmp;


//get total 
inputs.addEventListener('keyup', function ()
{
    if (price.value != '')
    {
        let result = (+price.value + +Taxis.value + +Ads.value) - +Discount.value;
        total.textContent = result;
        total.style.background = '#040';
    } else {
        total.textContent = '';
        total.style.background = 'rgb(59, 2, 76)';
    }
});

//reload in web delete any latter in Small
window.onload = function ()
{
    total.textContent = '';
};

//create product

//create variable array
let proDuct;

//condition if in a localstorage 
if (localStorage.PRODUCT != null)
{
    //array   
    proDuct = JSON.parse(localStorage.PRODUCT);
} else {
    proDuct = [];
}

//for to press in button
btn.addEventListener('click', function ()
{
    //Object
    let newPro =
    {
        title: title.value.toLowerCase(),
        price: price.value,
        Taxis: Taxis.value,
        Ads: Ads.value,
        Discount: Discount.value,
        total: total.textContent,
        count: count.value,
        Category: Category.value.toLowerCase()
    };

    //count
    if (title.value != '' && price.value != '' && Category.value != '' && newPro.count < 51)
    {
        if (mode === 'create')
        {
            if (newPro.count > 1)
            {
                for (let i = 0; i < newPro.count; i++)
                {
                    proDuct.push({ ...newPro });
                }
            } else {
                proDuct.push(newPro);
            }
        } else {
            proDuct[tmp] = newPro;
            mode = 'create';
            btn.textContent = 'Create';
            count.style.display = 'block';
        }

        //save localstorage
        localStorage.setItem('PRODUCT', JSON.stringify(proDuct));
        //come to function clearData,showData
        clearData();
        showData();
    }
});


//clear inputs

//press in btn clear all data now
function clearData()
{
    title.value = '';
    price.value = '';
    Taxis.value = '';
    Ads.value = '';
    Discount.value = '';
    total.textContent = '';
    count.value = '';
    Category.value = '';
}

//read
function showData()
{
    let table = '';
    for (let i = 0; i < proDuct.length; i++)
    {
        table += `
        <tr>
                <td>${i+1}</td>
                <td>${proDuct[i].title}</td>
                <td>${proDuct[i].price}</td>
                <td>${proDuct[i].Taxis}</td>
                <td>${proDuct[i].Ads}</td>
                <td>${proDuct[i].Discount}</td>
                <td>${proDuct[i].total}</td>
                <td>${proDuct[i].Category}</td>
                <td><button onclick='ubdate(${i})' id='update'>Update</button></td>
                <td><button onclick='deleteData(${i})' id='delete'>Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let Deleteall = document.getElementById('DeleteAll');
    if (proDuct.length > 0)
    {
        Deleteall.innerHTML =
            `<button onclick='DeleteAll()'>Delete All (${proDuct.length})</button>`;
    } else {
        Deleteall.innerHTML = '';
    }
}
showData();

//delete

function deleteData(i)
{
    proDuct.splice(i, 1);
    localStorage.setItem('PRODUCT', JSON.stringify(proDuct));
    showData();
}

function DeleteAll()
{
    localStorage.removeItem('PRODUCT');
    proDuct.splice(0);
    showData();
}

//function update
function ubdate(i)
{
    //come to value from arrays
    title.value = proDuct[i].title;
    price.value = proDuct[i].price;
    Taxis.value = proDuct[i].Taxis;
    Ads.value = proDuct[i].Ads;
    Discount.value = proDuct[i].Discount;
    total.textContent = proDuct[i].total;
    count.style.display = 'none';
    Category.value = proDuct[i].Category;
    btn.textContent = 'Update';
    mode = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}

//search

let searchDefault = 'title';

function getSearch(id)
{
    if (id === 'by-title')
    {
        searchDefault = 'title';
        search.placeholder = 'Search by title';
    } else {
        searchDefault = 'Category';
        search.placeholder = 'Search by category';
    }

    search.focus();
    search.value = '';
    showData();
}

//البحث بيتفعّل تلقائي وانت بتكتب
search.addEventListener('keyup', function ()
{
    if (search.value != '')
    {
        searchData(search.value);
    } else {
        showData();
    }
});

function searchData(value)
{
    let table = '';

    if (searchDefault == 'title')
    {
        for (let i = 0; i < proDuct.length; i++)
        {
            if (proDuct[i].title.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${proDuct[i].title}</td>
                        <td>${proDuct[i].price}</td>
                        <td>${proDuct[i].Taxis}</td>
                        <td>${proDuct[i].Ads}</td>
                        <td>${proDuct[i].Discount}</td>
                        <td>${proDuct[i].total}</td>
                        <td>${proDuct[i].Category}</td>
                        <td><button onclick='ubdate(${i})' id='update'>Update</button></td>
                        <td><button onclick='deleteData(${i})' id='delete'>Delete</button></td>
                </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < proDuct.length; i++)
        {
            if (proDuct[i].Category.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${proDuct[i].title}</td>
                        <td>${proDuct[i].price}</td>
                        <td>${proDuct[i].Taxis}</td>
                        <td>${proDuct[i].Ads}</td>
                        <td>${proDuct[i].Discount}</td>
                        <td>${proDuct[i].total}</td>
                        <td>${proDuct[i].Category}</td>
                        <td><button onclick='ubdate(${i})' id='update'>Update</button></td>
                        <td><button onclick='deleteData(${i})' id='delete'>Delete</button></td>
                </tr>
                `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}

//clean data