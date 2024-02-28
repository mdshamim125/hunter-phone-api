const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;

    //console.log(phones);

  displayPhones(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);

  //   step:1 find the container where I want to set the div
  const phoneContainer = document.getElementById("phone-container");

  // clear phoneContainer cards before adding new phone cards
  phoneContainer.innerHTML = "";

  //   display show all button if there are more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //display only first 12 phones
  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    // console.log(phone);

    //step:2 creat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;

    // step:3 set innerhtml
    phoneCard.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
            alt="Shoes"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `;

    // step:4 append child
    phoneContainer.appendChild(phoneCard);
  });
};

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  //   console.log(searchText);

  loadPhone(searchText);
};

// another search button
const handleSearch2 = () => {
  const searchField2 = document.getElementById("search-field2");
  const searchText2 = searchField2.value;
  loadPhone(searchText2);
};

// loadPhone();
