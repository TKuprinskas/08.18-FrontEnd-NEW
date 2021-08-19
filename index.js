const table = document.querySelector("tbody");
function displayTable(data) {
  data.forEach((item) => {
    const tr = table.insertRow();
    tr.classList = "rows";
    tr.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `/products.html?item=${item._id}`;
    });

    const td1 = tr.insertCell();
    td1.textContent = item.title;
    td1.id = "td1";

    const td2 = tr.insertCell();
    td2.textContent = item.info;
    td2.id = "td2";

    const td3 = tr.insertCell();
    const img = document.createElement("img");
    td3.append(img);
    td3.id = "td3";
    img.id = "image";
    img.src = `${item.image}`;

    const td4 = tr.insertCell();
    td4.textContent = `${item.price.toFixed(2)}€`;
    td4.id = "td4";
  });
}

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    if (data.length > 0) {
      return displayTable(data);
    }
    document.querySelector(
      "table"
    ).innerHTML = `No items found. Please add some.`;
  })
  .catch((e) => {
    console.log(e);
    document.querySelector(
      "table"
    ).innerHTML = `An error has occured. Please try again later.`;
  });
