const productList = [
  {
    product:"Pants",
    quantity:0,
    unitPrice: 40.99
  },
  {
    product:"Shirts",
    quantity:0,
    unitPrice: 10.99
  },
  {
    product:"Gloves",
    quantity:0,
    unitPrice: 15.99
  },
  {
    product:"Caps",
    quantity:0,
    unitPrice: 5.49
  },
  {
    product:"Shoes",
    quantity:0,
    unitPrice: 35.49
  },
  {
    product:"jackets",
    quantity:0,
    unitPrice: 75.49
  }
];

let subTotal = 0;

function getProductAsList(product){
  return `<li>
            <ul class="product-row">
              <li>${product.product}</li>
              <li><input type="button" value="-" id="${product.product}dec">
                  <label id="${product.product}id">${product.quantity}</label>
                  <input type="button" value="+" id="${product.product}inc">
                  </li>
              <li>${product.unitPrice.toFixed(2)}</li>
              <li id="${product.product}ExtendedPrice">${product.quantity*product.unitPrice}</li>
            </ul>
          </li>`
}

function decreaseQuantity(product){
  if(product.quantity > 0){
    product.quantity--;
    document.getElementById(`${product.product}id`).innerHTML = product.quantity;
  }
}

function increaseQuantity(product){
  product.quantity++;
  document.getElementById(`${product.product}id`).innerHTML = product.quantity;
}

function addEvents(product){
  let decButtonID = `${product.product}dec`;
  let incButtonID = `${product.product}inc`;
  document.getElementById(decButtonID).addEventListener("click", () => decreaseQuantity(product));
  document.getElementById(incButtonID).addEventListener("click", () => increaseQuantity(product));
}

function updatePrice(product){
  console.log(`${product.product}ExtendedPrice`);
  let extendedPrice = product.quantity*product.unitPrice;
  document.getElementById(`${product.product}ExtendedPrice`).innerHTML = extendedPrice.toFixed(2);
  subTotal += extendedPrice;
}

function updateInvoice(promo5050=false, taxPercent=0.13){
  subTotal = 0; 
  productList.map(updatePrice);

  if(promo5050==true){
    document.getElementById("sub-total").innerHTML = `Subtotal: ${subTotal.toFixed(2)}%2 = ${(subTotal/2).toFixed(2)}`;
    subTotal/=2;
  }
  else
    document.getElementById("sub-total").innerHTML = `Subtotal: ${subTotal.toFixed(2)}`;

  
  let tax = subTotal*taxPercent;
  document.getElementById("tax").innerHTML = `Tax: ${tax.toFixed(2)}`;
  let total = tax + subTotal;
  document.getElementById("total").innerHTML = `Total: ${total.toFixed(2)}`;
  document.getElementById("promo-applied").innerHTML = "";
}

const getPromoCode = () => {
  const promo = window.prompt("Enter promo code");
  if(promo != null){
    if(promo.toUpperCase() == "NOTAX"){
      updateInvoice(false, 0);
      document.getElementById("promo-applied").innerHTML = `Promo Applied = ${promo.toUpperCase()}, Description = Taxes are waived off`;
    }
    else if(promo.toUpperCase() == "FIFTYFIFTY"){
      updateInvoice(true);
      document.getElementById("promo-applied").innerHTML = `Promo Applied = ${promo.toUpperCase()}, Description = 50% off on Subtotal`;
    }
    else{
      window.alert(`PromoCode - ${promo} is Invalid`); 
    }
  }
}

window.addEventListener('load', function(){

  document.getElementById("product-list").innerHTML += productList.map(getProductAsList).join('\n');
  productList.map(addEvents)

  document.getElementById("calculate").addEventListener("click", updateInvoice);

  document.getElementById("promo-button").addEventListener("click", getPromoCode);

});

