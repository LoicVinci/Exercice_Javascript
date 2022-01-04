/**
 * Render a view of the pizzas into the #page div (formerly pizzaView function )
 */

const HomePage = async () => {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  try {
    // hide data to inform if the pizza menu is already printed
    const response = await fetch("/api/games"); // fetch return a promise => we wait for the response

    if (!response.ok) {
      // status code was not 200, error status code
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const games = await response.json(); // json() returns a promise => we wait for the data
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "d-inline-flex w-50 p-3 h-50 table-responsive pt-5 bg-dark";
    // create an HTMLTableElement dynamically, based on the pizzas data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table table";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    thead.className = "text-light";
    const header = document.createElement("tr");
    header.className = "text-light";
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Game";
    const header2 = document.createElement("th");
    header2.innerText = "Link";
    const header3 = document.createElement("th");
    header3.innerText = "Like";
    const header4 = document.createElement("th");
    header4.innerText = "Vote";
    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);
    table.appendChild(thead);
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    tbody.className = "text-light";
    games.forEach((game) => {
      const line = document.createElement("tr");
      const titleCell = document.createElement("td");
      titleCell.innerText = game.name;
      line.appendChild(titleCell);
      const descriptionCell = document.createElement("td");
      descriptionCell.innerText = game.link;
      line.appendChild(descriptionCell);
      const likeCell = document.createElement("td");
      likeCell.innerText = game.like;
      line.appendChild(likeCell);
      const voteCell = document.createElement("td");
      voteCell.innerHTML += `<button><3</button>`;
      voteCell.addEventListener("click", function() {
        console.log("OK" + game.id);
        try {
          const options = {
            method: "PUT",
          };
          const reponse = fetch("/api/games/" + game.id, options); 

          if(!reponse.ok) {
            throw new Error(
              "fetch error : " + reponse.status + " : " + reponse.statusText
            );
          }
          const game = reponse.json();
        } catch(error) {
          console.error("HomePage::error: ", error);
        }
      });
      line.appendChild(voteCell);

      // hide info within each row, the pizza id
      line.dataset.gameId = game.id;
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
    // add the HTMLTableElement to the main, within the #page div
    pageDiv.appendChild(tableWrapper);
  } catch (error) {
    console.error("gameView::error: ", error);
  }
};

export default HomePage;
