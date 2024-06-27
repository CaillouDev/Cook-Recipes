const init = () => {
  if (sessionStorage.getItem("logged") === null) {
    sessionStorage.setItem("logged", JSON.stringify(false));
  }

  const admins = [
    { email: "admin1", password: "azerty" },
    { email: "admin2", password: "azerty" },
  ];

  localStorage.setItem("admins", JSON.stringify(admins));
  if (sessionStorage.getItem("recipes-list") === null) {
    sessionStorage.setItem("recipes-list", JSON.stringify(recipes));
  }

  if (JSON.parse(sessionStorage.getItem("logged")) === true) {
    document.getElementById("add-recipe").classList.remove("hidden");
  } else {
    if (!document.getElementById("add-recipe").classList.contains("hidden")) {
      document.getElementById("add-recipe").classList.add("hidden");
    }
  }
  connectButtonValue(document);
  updateDisplayRecipeList(JSON.parse(sessionStorage.getItem("recipes-list")));
};

const deleteRecipe = (id) => {
  let recipeList = JSON.parse(sessionStorage.getItem("recipes-list"));
  recipeList.splice(id - 1, 1);
  recipeList.forEach((recipe, index) => (recipe.id = index + 1));
  sessionStorage.setItem("recipes-list", JSON.stringify(recipeList));
  updateDisplayRecipeList(recipeList);
};

const updateDisplayRecipeList = (recipes) => {
  document.getElementById("recipes-list").innerHTML = "";
  if (recipes.length === 0) {
    document.getElementById("recipes-list").classList.remove("grid");
    document.getElementById("recipes-list").classList.add("flex");
    const noResultMsg = document.createElement("p");
    noResultMsg.innerText = "Il n'y a rien à voir ici pour le moment ...";
    noResultMsg.classList = "mx-auto";
    document.getElementById("recipes-list").append(noResultMsg);
  }
  recipes.forEach((recipe) => {
    const head = document.createElement("div");
    head.classList = "flex justify-around items-center h-[4rem]";
    const title = document.createElement("p");
    title.innerText = recipe.name;
    title.classList = "justify-self-center col-start-2 col-end-3 font-[500]";
    const category = document.createElement("i");
    categoryIcon(document, category, recipe, "2xl");
    const favorite = document.createElement("i");
    favoriteIcon(favorite, recipe, "2xl");
    favorite.addEventListener("click", () => {
      favoriteUnfavorite(favorite, recipe, "2xl");
    });
    head.append(category, title, favorite);
    const photoContainer = document.createElement("div");
    photoContainer.classList = `rounded-lg my-4 bg-[url('${recipe.photo}')] bg-cover h-[10rem] w-[15rem] hover:cursor-pointer transition ease-in-out delay-250 duration-500 hover:scale-110 shadow-[0.2rem_0.2rem_0.3rem_grey] `;
    photoContainer.addEventListener("click", () => {
      showDetails(recipe.id);
    });
    const opinion = document.createElement("div");
    const iconOpinions = document.createElement("i");
    iconOpinions.classList = "";
    const numberOfOpinions = document.createElement("p");
    numberOfOpinions.innerText = `${recipe.comments.length} avis`;
    opinion.append(iconOpinions, numberOfOpinions);
    const clientsRatings = document.createElement("div");
    clientsRatings.classList = "flex justify-around";
    let allNotes = [];
    recipe.comments.forEach((note) => allNotes.push(note.note));
    let averageNote =
      allNotes.length === 0
        ? 0
        : (
            allNotes.reduce((sum, note) => (sum += note)) /
            recipe.comments.length
          ).toFixed(1);
    createStars(averageNote, clientsRatings);
    clientsRatings.append(opinion);
    const prepTiming = document.createElement("p");
    prepTiming.innerText =
      recipe.prepTiming.duration === 0
        ? "Préparation :\n-"
        : `Préparation :\n${recipe.prepTiming.duration} ${recipe.prepTiming.unit}`;
    const cookTiming = document.createElement("p");
    cookTiming.innerText =
      recipe.cookTiming.duration === 0
        ? "Cuisson :\n-"
        : `Cuisson :\n${recipe.cookTiming.duration} ${recipe.cookTiming.unit}`;
    const timingBox = document.createElement("div");
    timingBox.classList = "flex justify-around";
    timingBox.append(prepTiming, cookTiming);
    const modifyButton = document.createElement("button");
    modifyButton.addEventListener("click", () => {
      window.location.replace(`./edit.html?id=${recipe.id}#main`);
    });
    modifyButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
      deleteRecipe(recipe.id);
    });
    const linkRecipe = document.createElement("div");
    linkRecipe.classList = "text-center";
    linkRecipe.append(head, photoContainer, clientsRatings, timingBox);
    const adminButtons = document.createElement("div");
    adminButtons.dataset.type = "admin-buttons";
    adminButtons.classList = "flex justify-around";
    if (JSON.parse(sessionStorage.getItem("logged")) !== true) {
      adminButtons.classList.add("hidden");
      document.getElementById("add-recipe").classList.add("hidden");
    }
    adminButtons.append(modifyButton, deleteButton);
    const newRecipe = document.createElement("li");
    newRecipe.classList = "flex flex-col justify-around max-w-[15rem]";
    newRecipe.append(linkRecipe, adminButtons);
    document.getElementById("recipes-list").appendChild(newRecipe);
  });
  document.getElementById("total-recipes").innerText = `${
    JSON.parse(sessionStorage.getItem("recipes-list")).length
  }`;
  document.getElementById("veg-recipes").innerText = `${
    JSON.parse(sessionStorage.getItem("recipes-list")).filter(
      (recipe) => recipe.category === "veg"
    ).length
  }`;
  document.getElementById("main-dishes-recipes").innerText = `${
    JSON.parse(sessionStorage.getItem("recipes-list")).filter(
      (recipe) => recipe.category === "main-dishes"
    ).length
  }`;
  document.getElementById("desserts-recipes").innerText = `${
    JSON.parse(sessionStorage.getItem("recipes-list")).filter(
      (recipe) => recipe.category === "desserts"
    ).length
  }`;
  document.getElementById("drinks-recipes").innerText = `${
    JSON.parse(sessionStorage.getItem("recipes-list")).filter(
      (recipe) => recipe.category === "drinks"
    ).length
  }`;
};

const search = () => {
  const searchedRecipe = JSON.parse(
    sessionStorage.getItem("recipes-list")
  ).filter((recipe) =>
    recipe.name
      .toLowerCase()
      .includes(
        document.getElementById("search").value.trim().toLocaleLowerCase()
      )
  );
  updateDisplayRecipeList(searchedRecipe);
};

const showDetails = (id) => {
  window.location.replace(`./details.html?id=${id}`, "_blank");
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});

document.getElementById("add-recipe").addEventListener("click", () => {
  window.location.replace(`./edit.html`);
});

document.getElementById("search-bar").addEventListener("submit", (e) => {
  e.preventDefault();
  search();
  document.getElementById("search-bar").reset();
});

document.getElementById("filter-veg").addEventListener("click", () => {
  const vegList = JSON.parse(sessionStorage.getItem("recipes-list")).filter(
    (recipe) => recipe.category === "veg"
  );
  updateDisplayRecipeList(vegList);
});

document.getElementById("filter-main-dishes").addEventListener("click", () => {
  const mainDishesList = JSON.parse(
    sessionStorage.getItem("recipes-list")
  ).filter((recipe) => recipe.category === "main-dishes");
  updateDisplayRecipeList(mainDishesList);
});

document.getElementById("filter-desserts").addEventListener("click", () => {
  const dessertsList = JSON.parse(
    sessionStorage.getItem("recipes-list")
  ).filter((recipe) => recipe.category === "desserts");
  updateDisplayRecipeList(dessertsList);
});

document.getElementById("filter-drinks").addEventListener("click", () => {
  const drinksList = JSON.parse(sessionStorage.getItem("recipes-list")).filter(
    (recipe) => recipe.category === "drinks"
  );
  updateDisplayRecipeList(drinksList);
});

document.getElementById("filter-all").addEventListener("click", () => {
  updateDisplayRecipeList(JSON.parse(sessionStorage.getItem("recipes-list")));
});

document.getElementById("favorites").addEventListener("click", () => {
  const favoriteList = JSON.parse(
    sessionStorage.getItem("recipes-list")
  ).filter((recipe) => recipe.favorite === true);
  updateDisplayRecipeList(favoriteList);
});