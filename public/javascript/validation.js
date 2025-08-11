
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("listingform");

//   form.addEventListener("submit", function (e) { //error
//     let isValid = true;

//     // Title
//     const title = document.getElementById("title");
//     const titleError = document.getElementById("titleError");
//     const titleSuccess = document.getElementById("titleSuccess");

//     if (title.value.trim() === "") {
//       titleError.classList.remove("hidden");
//       titleSuccess.classList.add("hidden");
//       isValid = false;
//     } else {
//       titleError.classList.add("hidden");
//       titleSuccess.classList.remove("hidden");
//     }

//     // Description
//     const description = document.getElementById("description");
//     const descError = document.getElementById("descError");
//     const descSuccess = document.getElementById("descSuccess");

//     if (description.value.trim() === "") {
//       descError.classList.remove("hidden");
//       descSuccess.classList.add("hidden");
//       isValid = false;
//     } else {
//       descError.classList.add("hidden");
//       descSuccess.classList.remove("hidden");
//     }

//     // Price
//     const price = document.getElementById("price");
//     const priceError = document.getElementById("priceError");
//     const priceSuccess = document.getElementById("priceSuccess");

//     if (price.value.trim() === "" || isNaN(price.value)) {
//       priceError.classList.remove("hidden");
//       priceSuccess.classList.add("hidden");
//       isValid = false;
//     } else {
//       priceError.classList.add("hidden");
//       priceSuccess.classList.remove("hidden");
//     }

//     // Location
//     const location = document.getElementById("location");
//     const locationError = document.getElementById("locationError");
//     const locationSuccess = document.getElementById("locationSuccess");

//     if (location.value.trim() === "") {
//       locationError.classList.remove("hidden");
//       locationSuccess.classList.add("hidden");
//       isValid = false;
//     } else {
//       locationError.classList.add("hidden");
//       locationSuccess.classList.remove("hidden");
//     }

//     // Country
//     const country = document.getElementById("country");
//     const countryError = document.getElementById("countryError");
//     const countrySuccess = document.getElementById("countrySuccess");

//     if (country.value.trim() === "") {
//       countryError.classList.remove("hidden");
//       countrySuccess.classList.add("hidden");
//       isValid = false;
//     } else {
//       countryError.classList.add("hidden");
//       countrySuccess.classList.remove("hidden");
//     }

//     if (!isValid) {
//       e.preventDefault(); // Form ko rok do
//     }
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("listingform");

  if (!form) return; // ✅ Stop here if the form is not on this page

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Title
    const title = document.getElementById("title");
    const titleError = document.getElementById("titleError");
    const titleSuccess = document.getElementById("titleSuccess");

    if (title.value.trim() === "") {
      titleError.classList.remove("hidden");
      titleSuccess.classList.add("hidden");
      isValid = false;
    } else {
      titleError.classList.add("hidden");
      titleSuccess.classList.remove("hidden");
    }

    // Description
    const description = document.getElementById("description");
    const descError = document.getElementById("descError");
    const descSuccess = document.getElementById("descSuccess");

    if (description.value.trim() === "") {
      descError.classList.remove("hidden");
      descSuccess.classList.add("hidden");
      isValid = false;
    } else {
      descError.classList.add("hidden");
      descSuccess.classList.remove("hidden");
    }

    // Price
    const price = document.getElementById("price");
    const priceError = document.getElementById("priceError");
    const priceSuccess = document.getElementById("priceSuccess");

    if (price.value.trim() === "" || isNaN(price.value)) {
      priceError.classList.remove("hidden");
      priceSuccess.classList.add("hidden");
      isValid = false;
    } else {
      priceError.classList.add("hidden");
      priceSuccess.classList.remove("hidden");
    }

    // Location
    const location = document.getElementById("location");
    const locationError = document.getElementById("locationError");
    const locationSuccess = document.getElementById("locationSuccess");

    if (location.value.trim() === "") {
      locationError.classList.remove("hidden");
      locationSuccess.classList.add("hidden");
      isValid = false;
    } else {
      locationError.classList.add("hidden");
      locationSuccess.classList.remove("hidden");
    }

    // Country
    const country = document.getElementById("country");
    const countryError = document.getElementById("countryError");
    const countrySuccess = document.getElementById("countrySuccess");

    if (country.value.trim() === "") {
      countryError.classList.remove("hidden");
      countrySuccess.classList.add("hidden");
      isValid = false;
    } else {
      countryError.classList.add("hidden");
      countrySuccess.classList.remove("hidden");
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
});
