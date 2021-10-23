const price = document.getElementById("showPrice")
const smallChoice = document.getElementById("small");
const mediumChoice = document.getElementById("medium");
const largeChoice = document.getElementById("large");
const smoothieChoice = document.getElementById("smoothie");
const milkshakeChoice = document.getElementById("milkshake");
const smoothBase = document.getElementById("smoothieBase");
const milkBase = document.getElementById("milkshakeBase");
const extraChoice = document.getElementById("extras");
const extraH3 = document.getElementById("xtr");
const extraIt = document.getElementsByName("extraItems");
const form = document.getElementById("theForm");
const xform = document.getElementById("extraForm");
const ing = document.getElementsByName("ingred");
const btnAdd = document.getElementById("addToBtn");
const btnOrder = document.getElementById("orderBtn");
const btnSave = document.getElementById("saveBtn");
const btnLoad = document.getElementById("loadBtn");
const smb = document.getElementById("smoothieBase");
const output = document.getElementById("outputTotal");
const size = document.getElementsByName("size");
const type = document.getElementsByName("drinkType");
const smooth = document.getElementsByName("smoothieBase");
const milk = document.getElementsByName("milkBase");
const total = document.getElementById("tot");
const baseDrinkh3 = document.getElementById("bD");
const ingredientsh3 = document.getElementById("ingh3");
const ingredientsList = document.getElementById("ingredients");
const orderSummary = document.getElementById("orderMessage");
const chbx = document.querySelectorAll(".checkBx");

smallChoice.addEventListener("click", changePrice);
mediumChoice.addEventListener("click", changePrice);
largeChoice.addEventListener("click", changePrice);
smoothieChoice.addEventListener("click", changeOptions);
milkshakeChoice.addEventListener("click", changeOptions);
extraIt.forEach(item => item.addEventListener("change", addExtra));
ing.forEach(item => item.addEventListener("change", addEnable));
btnAdd.addEventListener("click", addToorder);
btnOrder.addEventListener("click", makeOrder);
btnSave.addEventListener("click", saveFavourite);
btnLoad.addEventListener("click", loadFavourite);

const smallPrice = 2.45;
const mediumPrice = 2.95;
const largePrice = 3.45;

let tot = 0;
let drinkTotal = 2.95;
let order = 0.00;
let array = [];
let dr = 0;
let save = {};
let favePrice = 0;

//reference to directory
let directory;

price.innerText = drinkTotal.toFixed(2);
btnAdd.disabled = true;
btnOrder.disabled = true;
btnLoad.disabled = true;
start();

function start() {
    smoothBase.style.display = "block";
    milkBase.style.display = "none";
    extraChoice.style.visibility = "hidden";
    extraH3.style.visibility = "hidden";
    smb.style.visibility = "hidden";
    baseDrinkh3.style.visibility = "hidden";
    ingredientsh3.style.visibility = "visible";
    ingredientsList.style.visibility = "visible";
    btnSave.disabled = true;
    btnAdd.disabled = true;
    for (i = 0; i < chbx.length; i++) {
        chbx[i].style.display = "none";
    }
    smoothieChoice.checked = false;
    milkshakeChoice.checked = false;
    mediumChoice.checked = true;
    changePrice();
}


function changePrice() {
    //adds small price to drink total
    if (smallChoice.checked) {
        drinkTotal = tot + smallPrice;
        price.innerText = drinkTotal.toFixed(2);
        //uncheck the extras boxes to avoid being able to reduce 
        //base price of drink while unchecking them 
        //after you change drink size or option 
        clearExtras();
    }
    //adds medium price to drink total
    else if (mediumChoice.checked) {
        drinkTotal = tot + mediumPrice;
        price.innerText = drinkTotal.toFixed(2);
        //uncheck the extras boxes to avoid being able to reduce 
        //base price of drink while unchecking them 
        //after you change drink size or option
        clearExtras();
    }
    //adds large price to drink total
    else if (largeChoice.checked) {
        drinkTotal = tot + largePrice;
        price.innerText = drinkTotal.toFixed(2);
        //uncheck the extras boxes to avoid being able to reduce 
        //the base price of drink while unchecking them 
        //after you change drink size or option
        clearExtras();
    }
}

function changeOptions() {
    //selecting smoothie resets the form to avoid working 
    //backwards after choosing milkshake
    if (smoothieChoice.checked) {
        smoothBase.style.display = "block";
        milkBase.style.display = "none";
        extraChoice.style.visibility = "hidden";
        extraH3.style.visibility = "hidden";
        smb.style.visibility = "visible";
        baseDrinkh3.style.visibility = "visible";
        ingredientsh3.style.visibility = "visible";
        ingredientsList.style.visibility = "visible";
        clearExtras();
        changePrice();
        orderSummary.innerText = "";
        for (i = 0; i < chbx.length; i++) {
            chbx[i].style.display = "block";
        }

    }
    //milkshake makes the extras visable and the milkshake base options
    else if (milkshakeChoice.checked) {
        milkBase.style.display = "block";
        smoothBase.style.display = "none";
        smb.style.visibility = "hidden";
        extraChoice.style.visibility = "visible";
        extraH3.style.visibility = "visible";
        baseDrinkh3.style.visibility = "visible";
        ingredientsh3.style.visibility = "visible";
        ingredientsList.style.visibility = "visible";
        clearExtras();
        orderSummary.innerText = "";
        for (i = 0; i < chbx.length; i++) {
            chbx[i].style.display = "block";
        }
    }
}

function addExtra() {
    let sum = 0;
    if (this.checked) {
        sum += 0.5;
    }
    else {
        sum -= 0.5;
    }
    drinkTotal += sum;
    price.innerText = drinkTotal.toFixed(2);
}

function addEnable() {
    if (smoothieChoice.checked || milkshakeChoice.checked) {

        let i = 6;
        //checking all the checkboxes for changes and also adding 1 to a 
        //variable called i or taking 1 away if un checked
        for (let a = 0; a < ing.length; a++) {
            if (ing[a].checked) { i += 1; } else { i -= 1; }
        }
        //checking the variable i is above 0, if so the button is enabled,
        if (i > 0) {
            btnAdd.disabled = false;
            btnSave.disabled = false;
        }
        else {
            btnAdd.disabled = true;
            btnSave.disabled = true;
        }
    }
    else {
        btnAdd.disabled = true;
        btnSave.disabled = true;
    }
}

function clearExtras() {
    //loops through the extras and unchecks the boxes
    let t;
    for (t = 0; t < extraIt.length; t++) {
        extraIt[t].checked = false;
    }

}

function clearIngredients() {
    //loops through the Ingredients list and unchecks the boxes
    let q;
    for (q = 0; q < ing.length; q++) {
        ing[q].checked = false;
    }

}

function checkRadioInput(item) {
    for (let i = 0; i < item.length; i++) {
        if (item[i].checked == true) {
            return item[i];
        }
    }
}

function checkCheckboxInput(item) {
    let check = [];
    for (let i = 0; i < item.length; i++) {
        if (item[i].checked) {
            check.push(item[i].value);
        }
    }
    return check;
}

function addToorder() {
    sizeC = checkRadioInput(size);
    drinkC = checkRadioInput(type);
    smoothC = checkRadioInput(smooth);
    milkC = checkRadioInput(milk);
    ingredients = checkCheckboxInput(ing);
    if (smoothieChoice.checked) {
        bC = smoothC;
    }

    else if (milkshakeChoice.checked) {
        bC = milkC;
    }
    xtra = checkCheckboxInput(extraIt);
    array.push(sizeC.value + " " + drinkC.value + ", Made With: " + bC.value + ", " + ingredients.join(", ") + ", " + xtra.join(", ") + " £" + price.innerText);
    output.innerText = array.join("\n");
    order += drinkTotal;
    total.innerText = "£ " + order.toFixed(2);
    clearIngredients();
    btnOrder.disabled = false;
    start();
}

function makeOrder() {
    orderSummary.innerText = "Thanks - Your Order Has Been Received \nTotal Cost " + "£" + order.toFixed(2);
    form.reset();
    tot = 0;
    drinkTotal = 2.95;
    order = 0;
    array = [];
    dr = 0;
    price.innerText = drinkTotal.toFixed(2);
    btnAdd.disabled = true;
    btnOrder.disabled = true;
    start();
    changePrice();
    total.innerText = "";
    output.innerText = "";
}

function saveFavourite() {
    btnLoad.disabled = false;
    favePrice = parseFloat(price.innerText);
    sizeC = checkRadioInput(size);
    drinkC = checkRadioInput(type);
    smoothC = checkRadioInput(smooth);
    milkC = checkRadioInput(milk);
    ingredients = checkCheckboxInput(ing);

    if (smoothieChoice.checked) {
        bC = smoothC;
    }

    else if (milkshakeChoice.checked) {
        bC = milkC;
    }
    xtra = checkCheckboxInput(extraIt);
    save.Favourite = sizeC.value + " " + drinkC.value + ", Made With: " + bC.value + ", " + ingredients.join(", ") + ", " + xtra.join(", ") + " £" + price.innerText;
    const fave = save;
    directory = fave;
    localStorage.clear();
    localStorage.setItem(`directory`, JSON.stringify(directory));

}

function loadFavourite() {

    if ("directory" in localStorage) {
        directory = JSON.parse(localStorage.getItem("directory"));
        array.push(directory.Favourite);
        output.innerText = array.join("\n");
        drinkTotal = favePrice;
        order += drinkTotal;
        total.innerText = "£ " + order.toFixed(2);
        btnOrder.disabled = false;
    } else {
        directory = [];
    }
}