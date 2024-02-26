let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
displayItemsHome();
displayBagIcon();


function displayBagIcon(){
  let bagNumber = document.querySelector('#bagNumber');
  if(!bagNumber){return}
  if(bagItems.length ==0){
    bagNumber.classList.remove('bagIconNumber');
  }
  else{
    bagNumber.classList.add('bagIconNumber');
    bagNumber.innerText = bagItems.length||'';
  }
}

 
function addToBag(productId){
  let notPresent = true;

  if(bagItems.length > 0){
    bagItems.forEach(product => {
      if(product == productId){
        alert('Product Already Present in Cart');
        notPresent=false;
      }
    });
    
  }
  if(notPresent){
      bagItems.push(productId);
      // console.log(bagItems);
      localStorage.setItem('bagItems',JSON.stringify(bagItems));
      displayBagIcon();
    }
}

function displayItemsHome(){
  let mainContainer=document.querySelector('.products-container');
  if(!mainContainer){
    return;
  }
  let newHtml = '';
productsList.forEach(product => {
  newHtml += 
  `
  <div class="product-container">
      <img src=${product.image} alt="product-image" class="product-image">
      <div class="ratings">
        <span class="stars">${product.ratings.stars}⭐</span>
        <span class="reviews">| ${product.ratings.reviews}</span>
      </div>
      <div class="company">
       ${product.company}
      </div>
      <div class="product-desc">
      ${product.productDesc}
      </div>
      <div class="pricing">
        <span class="discounted-price">Rs ${product.discountedPrice}</span>
        <span class="original-price">Rs${product.originalPrice}</span>
        <span class="discount-percentage">(${product.discount}%OFF)</span>
      </div>
      <button class="btn-addToBag" onclick ="addToBag(${product.id})">Add to Bag</button>
    </div>
  `
});


mainContainer.innerHTML = newHtml;

}



