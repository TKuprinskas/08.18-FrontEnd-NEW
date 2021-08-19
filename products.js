const queryString = window.location.search;
const params = queryString.split("=")[1];
const url = "http://localhost:3000/products";
const output = document.getElementById("output");

const getProduct = async (url, params) => {
  try {
    const response = await fetch(`${url}/${params}`).then((data) =>
      data.json()
    );
    return response;
  } catch (err) {
    return console.error(err);
  }
};

getProduct(url, params).then((data) => renderDataToElement(data, output));

const renderDataToElement = (data, element) => {
  if (data.length === 0) {
    return console.log("No data");
  }

  const product = data[0];
  const div = document.createElement("div");
  const img = document.createElement("img");
  const pPrice = document.createElement("p");
  const pTitle = document.createElement("p");
  pTitle.id = "pTitle";
  const pDescription = document.createElement("p");
  const divHero = document.createElement("div");

  pTitle.textContent = product.title;
  pDescription.textContent = product.description;
  divHero.append(pTitle, pDescription);
  pPrice.textContent = `${product.price}€`;
  img.src = product.image;
  div.append(img, divHero, pPrice);
  element.appendChild(div);
};
