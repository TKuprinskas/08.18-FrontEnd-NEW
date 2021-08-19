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
  const pInfo = document.createElement("p");
  pInfo.id = "pInfo";
  const pPrice = document.createElement("p");
  pPrice.id = "pPrice";
  const pTitle = document.createElement("p");
  pTitle.id = "pTitle";
  const pDescription = document.createElement("p");
  pDescription.id = "pDescription";
  const divHero = document.createElement("div");

  pInfo.textContent = product.info;
  pTitle.textContent = product.title;
  pDescription.textContent = product.description;
  divHero.append(pTitle, pInfo, pDescription);
  pPrice.textContent = product.price;
  img.src = product.image;
  div.append(img, divHero, pPrice);
  element.appendChild(div);
};

// Order form

const form = document.getElementById("orderForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.elements.name.value.trim();
  const email = e.target.elements.email.value.trim();
  const product_id = params;
  const price = document.getElementById("pPrice");

  console.log(name, email, product_id, price);

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      product_id,
      price,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.msg);
      form.reset();
    })
    .catch((e) => console.log(e));
});
