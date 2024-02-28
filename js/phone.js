const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;

  //console.log(phones);

  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  //   step:1 find the container where I want to set the div

  const phoneContainer = document.getElementById("phone-container");

  // clear phoneContainer cards before adding new phone cards

  phoneContainer.innerHTML = "";

  //   display show all button if there are more than 12 phone

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //display only first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);

    //step:2 create a div

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;

    // step:3 set innerHtml

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
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug};')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    `;

    // step:4 append child

    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner

  toggleLoadingSpinner(false);
};

// handle search button

const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  //   console.log(searchText);

  loadPhone(searchText);
};

// another search button
const handleSearch2 = (isShowAll) => {
  const searchField2 = document.getElementById("search-field2");
  const searchText2 = searchField2.value;
  toggleLoadingSpinner(true);
  loadPhone(searchText2, isShowAll);
};

//loading spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all

const handleShowAll = () => {
  handleSearch2(true);
};

// handle show details button for every single phone

const handleShowDetails = async (id) => {
  console.log(id);

  //   const res = await fetch(
  //     `https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`
  //   );

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(data);
  //   showPhoneDetails(phone);
};

// show phone details

const showPhoneDetails = (phone) => {
  // console.log(phone)
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;
  show_details_modal.showModal();
};

// loadPhone();
