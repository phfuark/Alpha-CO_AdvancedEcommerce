export function loadProducts(productList, load) {
    /* carrega os produtos na home e na pagina de prododus*/
  
    productList.forEach((produto) => {
      const valParcela = (produto.preco / 10).toFixed(2);
      const html = `
        <div class="product-card" id="prod${produto.codigoProduto}">
          <div>
            <img src="${produto.imagemProduto.img1}" alt="${produto.tituloProduto}" />
          </div>
          <div class="product-card-info-container">
            <h2 class="product-card-title" title="${produto.tituloProduto}">
              ${produto.tituloProduto}
            </h2>
            <h4 class="product-card-reference">Cod. ${produto.codigoProduto}</h4>
            <h3 class="product-card-price">R$ ${produto.preco.toFixed(2)}</h3>
            <h4 class="product-card-installment">
              10x de R$ ${valParcela} s/juros
            </h4>
          </div>
          <a href="./product.html">
            <button id="btn${produto.codigoProduto}" class="product-card-btn">COMPRAR</button>
          </a>
        </div>
      `;
      document.getElementById('product-container').innerHTML += html;
    });  
  }
  
  // captura o codigo/id do produto
  export function getProdId(){
    let itens = document.querySelectorAll(".idprod")
    console.log(itens)
    itens.forEach(item => item.addEventListener('click',(evento)=>{
        let prodID = evento.target.id
        localStorage.setItem('prodId',prodID)
        
    }))
  }
  
  // localiza o produto na base de dados
  export function findProduct(productList, productId){
    let produto = productList.find(produto => produto.codigoProduto == productId)
    return produto
  }
  
  //carrega o produto na pagina do produto
  
  export function loadProduct(produto,selecaoProduto){
  
  const productCategory = document.querySelector("#product-category");
  productCategory.innerText = `${produto.categoriaProduto}`;
  
  const productTitle = document.querySelector("#product-title")
  
  productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`
  productTitle.children[1].innerText = `${produto.tituloProduto}`
  
  
   const HTML = `<div class="product_images_container">
  
   <div class="images_selector">
  
     <i class="bi bi-chevron-double-up"></i>
   <ul>
     <li><img src="${produto.imagemProduto.img1}" alt="" class="product_thumb"></li>
     <li><img src="${produto.imagemProduto.img2}"" alt="" class="product_thumb"></li>
     <li><img src="${produto.imagemProduto.img3}"" alt="" class="product_thumb"></li>
     <li><img src="${produto.imagemProduto.img4}"" alt="" class="product_thumb"></li>
   </ul>
   <i class="bi bi-chevron-double-down"></i>
   </div>
   <div class="images_main">
     <img src="${produto.imagemProduto.img1}" alt="">
   </div>
  </div>
  
  
  <div class="product_description_container">
   <h3 class="main-text">
     Descrição
  
   </h3>
   <p class="product_description">
     ${produto.descricao}
   </p>
  </div>`
  selecaoProduto.innerHTML = HTML
  
  const price = document.querySelector(".product_price_container")
  const parcela = (produto.preco/10).toFixed(2)
  price.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`
  price.children[1].innerText = `Ou em ate 10x sem juros de R$ ${parcela} no cartão de credito`
  
  
  
  }
  
// Calcular o total do carrinho
function cartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.preco * item.quantity, 0);
}

// Renderizar os itens do carrinho
export function loadCartItem(cartItems, cartItemsHTML) {
  if (!cartItems || cartItems.length === 0) {
    cartItemsHTML.innerHTML = "Seu carrinho está vazio.";
  } else {
    cartItemsHTML.innerHTML = ""; // Limpa o container antes de renderizar
    cartItems.forEach(item => {
      const itemHTML = `
        <div class="cart_item" id="${item.codigoProduto}">
          <div class="cart_item_main_img">
            <img src="${item.imagemProduto.img1}" alt="${item.tituloProduto}">
          </div>
          <div class="cart_item_info">
            <p>${item.tituloProduto}</p>
            <p>R$ ${item.preco.toFixed(2)} <span>Un.</span></p>
            <h3>R$ ${(item.preco * item.quantity).toFixed(2)}</h3>
            <div class="cart_item_qtd_selector">
              <div class="cart_item_qtd_selector_container">
                <i class="bi bi-dash"></i>
                <span>${item.quantity}</span>
                <i class="bi bi-plus"></i>
              </div>
              <button id="${item.codigoProduto}" class="remove">Remover</button>
            </div>
          </div>
        </div>
      `;
      cartItemsHTML.innerHTML += itemHTML;
    });

    // Atualiza o total na página
    const total = cartTotal(cartItems);
    localStorage.setItem("totalValue", total);
    const totalPrice = document.querySelector(".total.container-flex:nth-child(3) h3:nth-child(2)");
    totalPrice.innerHTML = `R$ ${total.toFixed(2)}`;
  }
}

// Remover itens do carrinho
export function removeCartItem(cartItems) {
  const removeButtons = document.querySelectorAll("button.remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const itemElement = event.target.closest(".cart_item");
      const itemId = itemElement.id;

      // Remove o item da lista e do DOM
      itemElement.remove();
      const itemIndex = cartItems.findIndex(item => item.codigoProduto === itemId);
      if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("listaCompras", JSON.stringify(cartItems));
      }

      // Atualiza o total na página
      const total = cartTotal(cartItems);
      localStorage.setItem("totalValue", total);
      const totalPrice = document.querySelector(".total.container-flex:nth-child(3) h3:nth-child(2)");
      totalPrice.innerHTML = `R$ ${total.toFixed(2)}`;
    });
  });
}

// Finalizar a compra
export function shop(orders) {
  const form = document.querySelector("#billing form");
  const inputs = form.querySelectorAll("input, select");
  const inputValues = {};

  // Capturar os dados do formulário
  inputs.forEach(input => {
    if (input.type !== "submit" && input.type !== "button") {
      inputValues[input.name] = input.value;
    }
  });

  // Criar o pedido
  const newOrder = {
    id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
    address: { ...inputValues },
    items: JSON.parse(localStorage.getItem("listaCompras")),
    totalValue: parseFloat(localStorage.getItem("totalValue"))
  };

  // Salvar o pedido e limpar o carrinho
  orders.push(newOrder);
  localStorage.setItem("pedidos", JSON.stringify(orders));
  alert("Pedido realizado com sucesso!");
  localStorage.removeItem("listaCompras");
  localStorage.removeItem("totalValue");
  window.location = "./index.html";
}
