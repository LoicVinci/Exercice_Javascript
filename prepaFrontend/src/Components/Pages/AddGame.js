import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";

/**
 */
function AddGamePage() {

  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  
  const form = document.createElement("form");
  form.className = "p-5";
  const name = document.createElement("input");
  name.type = "text";
  name.id = "name";
  name.placeholder = "Name of the game";
  name.required = true;
  name.className = "form-control mb-3";
  const link = document.createElement("input");
  link.type = "text";
  link.id = "link";
  link.required = true;
  link.placeholder = "Link of a cool Youtube vidéo";
  link.className = "form-control mb-3";
  const submit = document.createElement("input");
  submit.value = "Add";
  submit.type = "submit";
  submit.className = "btn btn-primary";
  form.appendChild(name);
  form.appendChild(link);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const link = document.getElementById("link");
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          name: name.value,
          link: link.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/games", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const game = await response.json(); // json() returns a promise => we wait for the data

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("AddGamePage::error: ", error);
    }
  }
}

export default AddGamePage;
