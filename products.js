const queryString = window.location.search;
const params = queryString.split("=")[1];
const url = "http://localhost:3000/products";
const urlOrders = "http://localhost:3000/orders";
const productPlace = document.getElementById("output");

const getProduct = async (url, params) => {
  try {
    const response = await fetch(`${url}/${params}`).then((res) => res.json());
    return response;
  } catch (e) {
    return console.error(e);
  }
};

getProduct(url, params).then((data) => productRender(data, productPlace));

const productRender = async (data, element) => {
  if (data.length === 0) {
    return console.log("No data");
  }
  const outputData = await data.filter((item) => item._id === params);
  const div = document.createElement("div");
  const img = document.createElement("img");
  const pricePlace = document.createElement("p");
  const prTitle = document.createElement("p");
  const about = document.createElement("p");
  div.style.margin = "3rem 1rem 3rem 2rem";
  div.style.padding = "2rem";
  div.style.textAlign = "center";
  div.style.border = "1px solid black";
  div.style.borderRadius = "2rem";
  prTitle.style.fontWeight = "bold";
  prTitle.style.fontSize = "2rem";
  prTitle.style.margin = "0 0 1rem 0";

  outputData.forEach((chekedPrd) => {
    prTitle.textContent = chekedPrd.title;
    about.textContent = chekedPrd.description;
    pricePlace.textContent = `€ ${chekedPrd.price}`;
    img.src = chekedPrd.image;
    img.alt = chekedPrd.title;
    img.style.width = "20rem";
    div.append(prTitle, img, about, pricePlace);
    element.appendChild(div);

    document.getElementById("orderForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const client = e.target.elements[0].value.trim();
      const clEmail = e.target.elements[1].value.trim();
      fetch(urlOrders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: client,
          email: clEmail,
          product_id: params,
          price: chekedPrd.price,
        }),
      })
        .then((res) => res.json())
        .then((data) => alert(`Jūsų užsakyta prekė yra ${chekedPrd.title}`));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  });
};
