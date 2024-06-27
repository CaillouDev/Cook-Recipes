const colorStars = (note, star, refNote) => {
  if (note >= refNote) {
    star.classList = "fa-solid fa-star text-[#E07D45] relative";
  } else if (note < refNote && note > refNote - 1) {
    let decimal = (note - (refNote - 1)).toFixed(1);
    star.style.background = `linear-gradient(to right,#E07D45 0%,#E07D45 ${
      decimal * 100
    }%,#F2E5D3 ${decimal * 100}%, #F2E5D3 100%)`;
    star.style.backgroundClip = "text";
    star.classList = `fa-solid fa-star text-[#E07D45] text-transparent relative`;
  } else {
    star.classList = "fa-regular fa-star text-[#E07D45] relative";
  }
};

const createStars = (note, parent) => {
  const stars = document.createElement("div");
  stars.id = "start-rating";
  const firstStar = document.createElement("i");
  colorStars(note, firstStar, 1);
  const firstStarCopy = document.createElement("i");
  firstStarCopy.classList = "fa-regular fa-star text-[#E07D45] absolute left-0";
  firstStar.append(firstStarCopy);
  const secondStar = document.createElement("i");
  colorStars(note, secondStar, 2);
  const secondStarCopy = document.createElement("i");
  secondStarCopy.classList =
    "fa-regular fa-star text-[#E07D45] absolute left-0";
  secondStar.append(secondStarCopy);
  const thirdStar = document.createElement("i");
  colorStars(note, thirdStar, 3);
  const thirdStarCopy = document.createElement("i");
  thirdStarCopy.classList = "fa-regular fa-star text-[#E07D45] absolute left-0";
  thirdStar.append(thirdStarCopy);
  const fourthStar = document.createElement("i");
  colorStars(note, fourthStar, 4);
  const fourthStarCopy = document.createElement("i");
  fourthStarCopy.classList =
    "fa-regular fa-star text-[#E07D45] absolute left-0";
  fourthStar.append(fourthStarCopy);
  const fifthStar = document.createElement("i");
  colorStars(note, fifthStar, 5);
  const fifthStarCopy = document.createElement("i");
  fifthStarCopy.classList = "fa-regular fa-star text-[#E07D45] absolute left-0";
  fifthStar.append(fifthStarCopy);
  stars.append(firstStar, secondStar, thirdStar, fourthStar, fifthStar);
  parent.appendChild(stars);
};

const favoriteIcon = (element, recipe, size) => {
  element.classList =
    recipe.favorite === false
      ? `fa-regular fa-bookmark text-[#ff6f61] text-${size} hover:cursor-pointer`
      : `fa-solid fa-bookmark text-[#ff6f61] text-${size} hover:cursor-pointer`;
};

const favoriteUnfavorite = (element, recipe, size) => {
  switch (recipe.favorite) {
    case true:
      recipe.favorite = false;
      element.classList = `fa-regular fa-bookmark text-[#ff6f61] text-${size} hover:cursor-pointer`;
      break;
    case false:
      recipe.favorite = true;
      element.classList = `fa-solid fa-bookmark text-[#ff6f61] text-${size} hover:cursor-pointer`;
      break;
  }
  const recipesList = JSON.parse(sessionStorage.getItem("recipes-list"));
  recipesList.splice(recipe.id - 1, 1, recipe);
  sessionStorage.setItem("recipes-list", JSON.stringify(recipesList));
};

const categoryIcon = (document,element, recipe, size) => {
  let color;
  switch (recipe.category) {
    case "veg":
      color = "#6F927F";
      element.classList = `fa-solid fa-leaf text-${size} text-[${color}]`;
      if (document.getElementById("general-header")) {
        document
          .getElementById("general-header")
          .classList.add("bg-[url('./Media/veg.jpg')]");
      }
      break;
    case "main-dishes":
      color = "#B0522A";
      element.classList = `fa-solid fa-bowl-food text-${size} text-[${color}]`;
      if(document
        .getElementById("general-header")){
        document
        .getElementById("general-header")
        .classList.add("bg-[url('./Media/maindish.jpg')]");
      }
      break;
    case "desserts":
      color = "#A96255";
      element.classList = `fa-solid fa-cheese text-${size} text-[${color}]`;
      if (document
        .getElementById("general-header")) {
        document
        .getElementById("general-header")
        .classList.add("bg-[url('./Media/desserts.jpg')]");
      }
      break;
    case "drinks":
      color = "#E07D45";
      element.classList = `fa-solid fa-whiskey-glass text-${size} text-[${color}]`;
      if (document
        .getElementById("general-header")) {
        document
        .getElementById("general-header")
        .classList.add("bg-[url('./Media/drinks.jpg')]");
      }
      break;
  }
};
