// input
let price=document.getElementById("price")
let texts=document.getElementById("texts")
let adv=document.getElementById("adv")
let discount=document.getElementById("discount")
let count=document.getElementById("count")
let category=document.getElementById("category")
let sumit=document.getElementById("sumit")
let total=document.getElementById('total')
let title=document.getElementById('title')
let mood='create';
let temp;

// function get price

function getPrice(){
    if(price.value !=''){
        let totalPrice=(+price.value+ +texts.value+ +adv.value) - +discount.value/100 ;
        total.innerHTML=totalPrice;
        total.style.background="green";
    }else{
        total.innerHTML="0";
        total.style.background="rgb(138, 45, 45)";
    }
}


// function   create

let products;
if(localStorage.product!=null){
    products=JSON.parse(localStorage.product);
}else{
    products=[];
}
sumit.onclick =function (){
    let newProduct={
        title:title.value,
        price:price.value,
        total:total.value,
        count:count.value,
        category:category.value,
        discount:discount.value,
        adv:adv.value
    }
    if(newProduct.title.value!='' && 
    newProduct.price.value!=''&&
    newProduct.count<500 && category.value !=''){
        if(mood==="create"){
            if(newProduct.count>1){
                for (let index = 0; index < newProduct.count; index++) {
                    products.push(newProduct);
                }
            }else{
                products.push(newProduct);
            }
        }else{
            products[temp]=newProduct;
            sumit.innerHTML="Create"
            count.style.display="block"
            mood="create";
    
        }
      
        clearInputs();
    }
    localStorage.setItem('product',JSON.stringify(products));
    addDate();

}


// clear function

function clearInputs(){
    title.value="";
    price.value="";
    adv.value="";
    discount.value="";
    category.value="";
    count.value="";
    texts.value="";
    total.innerHTML="";
}

// read data

function addDate(){
    getPrice();
    let table='';
    for (let index = 0; index < products.length; index++) {
        table+=`
        <tr>
        <td>${index+1}</td>
        <td>${products[index].title}</td>
        <td>${products[index].price}</td>
        <td>${products[index].texts}</td>
        <td>${products[index].adv}</td>
        <td>${products[index].discount}</td>
        <td>${products[index].total}</td>
        <td>${products[index].category}</td>
        <td><button onclick="update(${index})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table;
    
    let deleteAll=document.getElementById('deleteAll')
    if(products.length>0){
        deleteAll.innerHTML=`<button onclick="deleteAll()">Delete All ${products.length} </button>`
    }else{
        deleteAll.innerHTML='';
    }
}
addDate();


// delete product

function deleteProduct(index){
    products.splice(index,1);
    localStorage.product=JSON.stringify(products);
    addDate();
}




// deleteAll

function deleteAll(){
    products.splice(0);
    localStorage.product=JSON.stringify(products);
    addDate();
}

// update

function update(index){
    title.value=products[index].title;
    price.value=products[index].price;
    texts.value=products[index].texts;
    adv.value=products[index].adv;
    discount.value=products[index].discount;
    getPrice();
    count.style.display="none"
    category.value=products[index].category;
    total.value=products[index].total
    sumit.innerHTML="Update"
    mood='update';
    temp=index;
    scroll({
        top:0,
        behavior:"smooth"
        
    })
}

// search

let searchMood="title";

function SearchMood(id){
    let search=document.getElementById("search");
    if(id == "searcTitle"){
        searchMood="title"
        }else{
        searchMood="category"
    }
    search.placeholder ='Search by '+searchMood;
    search.focus();
    search.value="";
    addDate();
}

function searchData(value){
    let table='';
    for (let index = 0; index < products.length; index++) {
    if(searchMood == "title"){
            if(products[index].title.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                table+=`
                    <tr>
                    <td>${index+1}</td>
                    <td>${products[index].title}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].texts}</td>
                    <td>${products[index].adv}</td>
                    <td>${products[index].discount}</td>
                    <td>${products[index].total}</td>
                    <td>${products[index].category}</td>
                    <td><button onclick="update(${index})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>
                </tr>  `
            }  
        }
    else{
            if(products[index].category.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                table+=`
                    <tr>
                    <td>${index+1}</td>
                    <td>${products[index].title}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].texts}</td>
                    <td>${products[index].adv}</td>
                    <td>${products[index].discount}</td>
                    <td>${products[index].total}</td>
                    <td>${products[index].category}</td>
                    <td><button onclick="update(${index})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>
                </tr>  `
            }  

             }
    }
    document.getElementById("tbody").innerHTML=table;
}


// clean code 🤍🤍🤍🤍 عااش واللة
