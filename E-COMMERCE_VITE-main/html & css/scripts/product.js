// Captura o ID do produto da URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log(productId);
// Busca o produto no banco de dados
const product = window.database.find(p => p.id == productId);

if (product) {
    console.log(product)
    // Exibe os dados do produto
    // document.querySelector(".product-name").innerText = product.tituloProduto;
    // document.querySelector(".product-description").innerText = product.descricao;
    // document.querySelector(".product-price").innerText = `R$ ${product.preco.toFixed(2)} (NO PIX)`;
    // document.querySelector(".product-image").src = product.imagemProduto.img1;

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    console.log(product);
    // Adiciona o conteúdo do produto
    productDiv.innerHTML = `
        <div class="product-page">
            <div class="product-img">
                <img src="${product.imagemProduto.img1}" alt="${product.tituloProduto}">
            </div>
            <div class="product-text">
                <div>
                    <div class="name">${product.tituloProduto}</div>
                    <div class="qnt">${product.qnt} uni.</div>
                </div>
                <div>
                    <div class="descricao">${product.descricao}</div>
                </div>
                
                <div>
                    <div class="price">R$ ${product.preco.toFixed(2)} (NO PIX)</div>
                    <button>Adicionar ao Carrinho</button>
                </div>
        </div>
    `;

    const container = document.getElementById("product-container")
    // Adiciona o produto ao container
    container.appendChild(productDiv);
} else {
    console.error("Produto não encontrado!");
}
