document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("type").value;

  if (category != "chooseOne" && name.length > 0 && price > 0) {
    const product = {
      name,
      price,
      category,
    };

    try {
      const response = await fetch("/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        showProducts();
        document.getElementById("productForm").reset();
      } else {
        console.log("Failed to ADD Product", data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      showProducts();
    } else {
      console.log(data.err);
    }
  } catch (err) {
    console.log(err);
  }
};

const showProducts = async () => {
  try {
    const response = await fetch("/products");
    const data = await response.json();
    if (response.ok) {
      const products = data.allProducts;
      const electronicsList = document.getElementById("electronicsList");
      const skincareList = document.getElementById("skincareList");
      const foodList = document.getElementById("foodList");
      electronicsList.innerHTML = "";
      skincareList.innerHTML = "";
      foodList.innerHTML = "";

      for (let i = 0; i < products.length; i++) {
        if (products[i].category === "Electronics") {
          electronicsList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        } else if (products[i].category === "SkinCare") {
          skincareList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        } else if (products[i].category === "Food") {
          foodList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        }
      }
    } else {
      console.log(data.err);
    }
  } catch (err) {
    console.log(err);
  }
};

showProducts();
