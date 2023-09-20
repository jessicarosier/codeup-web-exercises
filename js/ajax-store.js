// (function () {
//   "use strict";
//   // TODO: Create an AJAX GET request for the file under data/inventory.json
//   $.ajax("data/inventory.json").done(function (data) {
//     console.log(data);
//     console.log(data[0].categories);
//
//     //HINT: You will want to target #insertProducts for your new HTML elements
//     let productDisplayEl = $("#insertProducts");
//
//     // TODO: Take the data from inventory.json and append it to the products table
//     let insertProducts = "";
//     for (let i = 0; i < data.length; i++) {
//       insertProducts += `<tr>`;
//       insertProducts += `<td class="border-end border-black">${data[i].title}</td>`;
//       insertProducts += `<td class="border-end border-black">${data[i].quantity}</td>`;
//       insertProducts += `<td class="border-end border-black">${data[i].price}</td>`;
//       insertProducts += `<td class="border-end border-black">${data[i].categories}</td>`;
//       insertProducts += `</tr>`;
//     }
//     productDisplayEl.html(insertProducts);
//   });
//
//   //Reloads the page when Refresh button is clicked
//   $("#refresh").on("click", function () {
//     location.reload();
//   });
// })();

//////////////////New BETTER WAY of doing things////////////////////////
// (async () => {
// const url = `data/inventory.json`;
// const options = {
//   method: "GET",
// };
// fetch(url, options)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
// })();

const getInventory = async () => {
  const url = `data/inventory.json`;
  const options = {
    method: "GET",
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const renderTableRow = (tool, target) => {
  const tableRow = document.createElement("tr");
  tableRow.poop = "poopy";
  tableRow.innerHTML = `
      <td class="border-end border-black">${tool.title}</td>
      <td class="border-end border-black">${tool.quantity}</td>
      <td class="border-end border-black">${tool.price}</td>
      <td class="border-end border-black">${tool.categories}</td>
      <td class="border-end border-black"><button>delete</button></td>
    `;
  const deleteBtn = tableRow.querySelector("button");

  //TODO: run a fetch to remove the item from the database, if successful then also remove it from the DOM

  deleteBtn.addEventListener("click", () => {
    tableRow.remove();
  });
  target.appendChild(tableRow);
};

const productDisplay = document.getElementById("insertProducts");

(async () => {
  const inventory = await getInventory();
  console.log(inventory);

  inventory.forEach((tool) => {
    renderTableRow(tool, productDisplay);
  });
})();
