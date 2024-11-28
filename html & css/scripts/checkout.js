// Carregar as funções necessárias de um arquivo externo
import { loadCartItem, removeCartItem, shop } from "./functions.js";

// Recuperar os itens salvos no localStorage
let cartItems = JSON.parse(localStorage.getItem("listaCompras")) || [];
let orders = JSON.parse(localStorage.getItem("pedidos")) || [];

// Referências ao DOM
const cartItemsHTML = document.querySelector("#checkout .grid_col_1");
const checkoutButton = document.querySelector(".checkout_btn");

// Carregar os itens do carrinho na página
loadCartItem(cartItems, cartItemsHTML);

// Habilitar a funcionalidade de remover itens
removeCartItem(cartItems);

// Ação ao clicar em "Ir para Pagamento"
checkoutButton.addEventListener("click", () => {
  if (cartItems.length > 0) {
    shop(orders);
  } else {
    alert("Seu carrinho está vazio. Adicione produtos antes de continuar.");
  }
});
