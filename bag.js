
let bagItemsObject ;

onload();
function onload(){
  LoadBagItems();
  displayBagItems();
  displaySummary();
}
function displaySummary(){
  let displaySummary = document.querySelector('.bag-summary');
  let totalItems = bagItemsObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalAmount = 0;
  if(totalItems>0){
    bagItemsObject.forEach(element => {
      totalMRP += element.originalPrice;
      totalDiscount += (element.originalPrice-element.discountedPrice);
    });
    finalAmount = (totalMRP-totalDiscount)+99;
  }
  

  displaySummary.innerHTML = 
  `
  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalAmount}</span>
  </div>
</div>
<button class="btn-place-order">
<div class="css-xjhrni">PLACE ORDER</div>
</button>
  `
}
function displayBagItems(){
  let display = document.querySelector('.bag-items-container');
  let newHTML = "";
  bagItemsObject.forEach(product => {
     newHTML+=
     `
     <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${product.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${product.company}</div>
              <div class="item-name">${product.productDesc}</div>
              <div class="price-container">
                <span class="current-price">Rs ${product.discountedPrice}</span>
                <span class="original-price">Rs ${product.originalPrice}</span>
                <span class="discount-percentage">(${product.discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${product.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${product.delivery_date}</span>
              </div>
            </div>

            <div onclick="removeFromBag(${product.id})" class="remove-from-cart">X</div>
          </div>
     `
  });

  display.innerHTML = newHTML;
  
}
function removeFromBag(productId){
  bagItems = bagItems.filter(value =>value!=productId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  onload();
  displayBagIcon();
}

function LoadBagItems(){
//bagitems-contains id for bag
//productsList-contains total products to compare
//to display products we need array of products object
  
bagItemsObject = bagItems.map(itemId =>{
    for(let i=0; i<productsList.length ; i++){
      if(itemId == productsList[i].id){
        return productsList[i];
      }
    }
})


}