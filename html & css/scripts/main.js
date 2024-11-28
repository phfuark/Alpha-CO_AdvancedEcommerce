// Aguarda o carregamento completo da página
window.addEventListener("load", () => {
    /**
     * Função para renderizar produtos em um container específico
     * @param {string} containerId - ID do container onde os produtos serão renderizados
     * @param {function} filterCallback - Filtro para selecionar os produtos a serem renderizados
     */
    function renderProducts(containerId, filterCallback) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Erro: Elemento com ID '${containerId}' não encontrado.`);
            return;
        }

        if (!window.database || !Array.isArray(window.database)) {
            console.error("Erro: O database.js não foi carregado corretamente ou não contém um array.");
            return;
        }

        // Limpa o container antes de renderizar
        container.innerHTML = "";

        // Itera sobre os produtos e aplica o filtro

        //HOMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
        window.database.forEach(product => {
            if (filterCallback(product)) {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                // Conteúdo do produto
                productDiv.innerHTML = `
                    <img src="${product.imagemProduto.img1}" alt="${product.tituloProduto}">
                    <div class="name">${product.tituloProduto}</div>
                    <div class="qnt">${product.qnt} uni.</div>
                    <br>
                    <div class="descricao">${product.descricao}</div>
                    <br><br>
                    <div class="price">R$ ${product.preco.toFixed(2)} (NO PIX)</div>
                    <a href="product.html?id=${product.id}"><button class="view-product" data-id="${product.id}">Compre Agora!</button></a>
                `;

                // Adiciona o produto ao container
                container.appendChild(productDiv);
            }
        });

        // Adiciona o evento de clique nos botões "Compre Agora!"
        const buttons = document.querySelectorAll(".view-product");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const productId = event.target.dataset.id;
                if (productId) {
                    window.location.href = `product.html?id=${productId}`;
                }
            });
        });
    }

    // Renderiza produtos normais (exibe produtos com 'exibirHome' como true)
    renderProducts("productGrid", product => product.exibirHome);

    // Renderiza produtos em destaque (categoria 'Destaque')
    renderProducts("productGrid2", product => product.categoriaProduto === "Destaque");
});
