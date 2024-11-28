import '../node_modules/xlsx/xlsx.js';

// Recupera os pedidos do localStorage
let orders = JSON.parse(localStorage.getItem("pedidos")) || []; // Default to empty array if no orders

// Função para exibir os pedidos
function displayOrders() {
  if (orders && orders.length > 0) {
    let orderList = document.getElementById("order-list");
    let orderListHtml = "";

    orders.forEach((order, index) => {
      orderListHtml += `
        <li class="order-card">
          <h3>Pedido: ${order.id}</h3>
          <p>Endereço:</p>
          <ul>
            <li>Cliente: ${order.address.name} ${order.address.surname}</li>
            <li>Rua: ${order.address.address}, ${order.address.address_2}</li>
            <li>Cidade: ${order.address.city}</li>
            <li>UF: ${order.address.UF}</li>
            <li>CEP: ${order.address.zip}</li>
          </ul>
          <p>Itens:</p>
          <ul>
      `;

      // Verifica se o pedido possui itens e é um array
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          orderListHtml += `
            <li>
              <p>Código Produto: ${item.codigoProduto}</p>
              <p>Produto: ${item.tituloProduto}</p>
              <p>Quantidade: ${item.quantity}</p>
              <p>Preço: R$ ${item.preco}</p>
            </li>
          `;
        });
      }

      orderListHtml += `
          </ul>
          <p>Valor Total do Pedido: R$ ${order.totalValue}</p>
        </li>
      `;
    });

    orderList.innerHTML = orderListHtml;
  } else {
    console.log("Nenhum pedido encontrado.");
    document.getElementById("order-list").innerHTML = "<p>Não há pedidos para exibir.</p>";
  }
}

// Chama a função de exibição dos pedidos
displayOrders();

// Função para exportar os pedidos para um arquivo Excel
function exportToExcel() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; // Default to empty array if no orders

  if (pedidos.length === 0) {
    alert("Não há pedidos para exportar.");
    return;
  }

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet([
    // Cabeçalho
    ["ID", "E-mail", "Nome", "Sobrenome", "Telefone", "CPF", "Endereço", "CEP", "Número", "Endereço 2", "Bairro", "Cidade", "UF", "Código Produto", "Título Produto", "Preço Produto", "Descrição Produto", "Categoria Produto", "Classificação Produto", "Exibição na Home", "Quantidade Produto", "Valor Total"],
    // Linhas de dados
    ...pedidos.flatMap((pedido) => {
      if (pedido.items && Array.isArray(pedido.items)) {
        return pedido.items.map((item) => [
          pedido.id,
          pedido.address.email,
          pedido.address.name,
          pedido.address.surname,
          pedido.address.phone,
          pedido.address.CPF,
          pedido.address.address,
          pedido.address.zip,
          pedido.address.number,
          pedido.address.address_2,
          pedido.address.neighborhood,
          pedido.address.city,
          pedido.address.UF,
          item.codigoProduto,
          item.tituloProduto,
          item.preco,
          item.descricao,
          item.categoriaProduto,
          item.classificacaoProduto,
          item.exibirHome,
          item.quantity,
          pedido.totalValue,
        ]);
      }
      return []; // Retorna um array vazio se não houver itens
    }),
  ]);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

  // Gera o arquivo Excel
  XLSX.writeFile(workbook, "pedidos.xlsx");
}

// Adiciona um event listener ao botão de exportação
const exportButton = document.getElementById("export-button");
if (exportButton) {
  exportButton.addEventListener("click", exportToExcel);
} else {
  console.log("Botão de exportação não encontrado.");
}
