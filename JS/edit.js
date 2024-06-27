const createIngredient = () => {
  const ingredientName = document.createElement("input");
  ingredientName.type = "text";
  ingredientName.classList = "rounded-lg px-2";
  ingredientName.setAttribute("data-id", "ingredient-name");
  const ingredientQuantity = document.createElement("input");
  ingredientQuantity.type = "number";
  ingredientQuantity.step = "0.1";
  ingredientQuantity.classList = "rounded-lg px-2";
  ingredientQuantity.setAttribute("data-id", "ingredient-quantity");
  const ingredientUnit = document.createElement("select");
  ingredientUnit.classList = "rounded-lg px-2";
  ingredientUnit.setAttribute("data-id", "ingredient-unit");
  const ingredientUnitEmpty = document.createElement("option");
  ingredientUnitEmpty.value = "";
  ingredientUnitEmpty.innerText = "";
  const ingredientUnitG = document.createElement("option");
  ingredientUnitG.value = "g";
  ingredientUnitG.innerText = "gramme";
  const ingredientUnitKg = document.createElement("option");
  ingredientUnitKg.value = "kg";
  ingredientUnitKg.innerText = "kilogramme";
  const ingredientUnitU = document.createElement("option");
  ingredientUnitU.value = "";
  ingredientUnitU.innerText = "unité";
  const ingredientUnitL = document.createElement("option");
  ingredientUnitL.value = "L";
  ingredientUnitL.innerText = "litre";
  const ingredientUnitMl = document.createElement("option");
  ingredientUnitMl.value = "mL";
  ingredientUnitMl.innerText = "millilitre";
  const ingredientUnitBouteille = document.createElement("option");
  ingredientUnitBouteille.value = "bouteille";
  ingredientUnitBouteille.innerText = "bouteille";
  const ingredientUnitPince = document.createElement("option");
  ingredientUnitPince.value = "pincée";
  ingredientUnitPince.innerText = "pincée";
  const ingredientUnitCAS = document.createElement("option");
  ingredientUnitCAS.value = "c. à s.";
  ingredientUnitCAS.innerText = "c. à s.";
  const ingredientUnitCAC = document.createElement("option");
  ingredientUnitCAC.value = "c. à c.";
  ingredientUnitCAC.innerText = "c. à c.";
  const ingredientUnitTranche = document.createElement("option");
  ingredientUnitTranche.value = "tranche";
  ingredientUnitTranche.innerText = "tranche";
  const ingredientUnitSachet = document.createElement("option");
  ingredientUnitSachet.value = "sachet";
  ingredientUnitSachet.innerText = "sachets";
  const ingredientUnitFeuille = document.createElement("option");
  ingredientUnitFeuille.value = "feuilles";
  ingredientUnitFeuille.innerText = "feuilles";
  ingredientUnit.append(
    ingredientUnitEmpty,
    ingredientUnitG,
    ingredientUnitKg,
    ingredientUnitU,
    ingredientUnitMl,
    ingredientUnitL,
    ingredientUnitBouteille,
    ingredientUnitPince,
    ingredientUnitCAS,
    ingredientUnitCAC,
    ingredientUnitTranche,
    ingredientUnitSachet,
    ingredientUnitFeuille
  );
  const deleteLi = document.createElement("button");
  deleteLi.type = "button";
  deleteLi.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteLi.addEventListener("click", () => {
    newIngredient.remove();
  });
  const newIngredient = document.createElement("li");
  newIngredient.classList = "grid grid-cols-[55%,15%,25%,5%] gap-1";
  newIngredient.append(
    ingredientName,
    ingredientQuantity,
    ingredientUnit,
    deleteLi
  );
  document.getElementById("ingredients-list").append(newIngredient);
};

const createStep = () => {
  const newStepDescription = document.createElement("textarea");
  newStepDescription.setAttribute("data-id", "step-description");
  newStepDescription.setAttribute("rows", 3);
  newStepDescription.classList = "rounded-lg px-1";
  const upButton = document.createElement("button");
  upButton.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
  upButton.type = "button";
  upButton.addEventListener("click", () => {
    if (newStep.previousElementSibling !== null) {
      newStep.previousElementSibling.insertAdjacentElement("beforebegin", newStep);
    }
  });
  const downButton = document.createElement("button");
  downButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  downButton.type = "button";
  downButton.addEventListener("click", () => {
    if (newStep.nextElementSibling !== null) {
      newStep.nextElementSibling.insertAdjacentElement("afterend", newStep);
    }
  });
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteButton.type = "button";
  deleteButton.addEventListener("click", () => {
    newStep.remove();
  });
  const newStep = document.createElement("li");
  newStep.classList = "rounded-lg p-2 grid grid-cols-[85%,5%,5%,5%]";
  newStep.append(newStepDescription, upButton, downButton, deleteButton);
  document.getElementById("step-list").appendChild(newStep);
};

const isEmpty = (input) => {
  if (input.value === "") {
    return true;
  } else {
    return false;
  }
};

const buildNewRecipe = (id) => {
  const recipeTitle = document.getElementById("title").value;
  const recipeCookTiming = parseInt(
    document.getElementById("cook-timing").value
  );
  const recipePrepTiming = parseInt(
    document.getElementById("prep-timing").value
  );
  const recipeRestTiming = parseInt(
    document.getElementById("rest-timing").value
  );
  const recipePhoto = document.getElementById("url").value;
  const ingredientsList = document.querySelectorAll("#ingredients-list>li");
  const stepsList = document.querySelectorAll("#step-list>li");
  const numberOfPersons = document.getElementById("number-of-persons").value;

  if (
    recipeTitle !== "" &&
    recipePhoto !== "" &&
    ingredientsList.length > 0 &&
    recipePrepTiming !== "" &&
    recipeRestTiming !== "" &&
    recipeCookTiming !== "" &&
    numberOfPersons > 0 &&
    stepsList.length > 0
  ) {
    let newRecipe = {};
    if (!isNaN(id)) {
      const currentRecipe = JSON.parse(sessionStorage.getItem("recipes-list"))[
        id
      ];
      newRecipe.favorite = currentRecipe.favorite;
      newRecipe.comments = currentRecipe.comments;
      newRecipe.id = currentRecipe.id;
    } else {
      newRecipe.favorite = false;
      newRecipe.comments = [];
      newRecipe.id =
        JSON.parse(sessionStorage.getItem("recipes-list")).length + 1;
    }
    newRecipe.name = recipeTitle.trim();
    newRecipe.cookTiming = {
      duration: recipeCookTiming,
      unit: document.getElementById("cook-timing-unit").value,
    };
    newRecipe.prepTiming = {
      duration: recipePrepTiming,
      unit: document.getElementById("prep-timing-unit").value,
    };
    newRecipe.restTiming = {
      duration: recipeRestTiming,
      unit: document.getElementById("rest-timing-unit").value,
    };
    newRecipe.photo = recipePhoto;
    newRecipe.category = document.getElementById("category").value;
    newRecipe.ingredients = [];
    ingredientsList.forEach((ingredient) => {
      let newIngredient = {};
      newIngredient.name = ingredient
        .querySelector("[data-id='ingredient-name']")
        .value.trim();
      newIngredient.quantity = parseInt(
        ingredient.querySelector("[data-id='ingredient-quantity']").value
      );
      newIngredient.unit = ingredient.querySelector(
        "[data-id='ingredient-unit']"
      ).value;
      newRecipe.ingredients.push(newIngredient);
    });
    newRecipe.steps = [];
    stepsList.forEach((step) =>
      newRecipe.steps.push(
        step.querySelector("[data-id='step-description']").value.trim()
      )
    );
    newRecipe.persons =
      numberOfPersons[0] === "0"
        ? parseInt(numberOfPersons.substring(1, numberOfPersons.length))
        : parseInt(numberOfPersons);
    return newRecipe;
  }
};

const addNewRecipe = () => {
  const recipList = JSON.parse(sessionStorage.getItem("recipes-list"));
  recipList.push(buildNewRecipe());
  sessionStorage.setItem("recipes-list", JSON.stringify(recipList));
  window.location.replace("./index.html");
};

const updateRecipes = () => {
  const newRecipe = buildNewRecipe(idToEdit());
  const recipList = JSON.parse(sessionStorage.getItem("recipes-list"));
  recipList.splice(idToEdit(), 1, newRecipe);
  sessionStorage.setItem("recipes-list", JSON.stringify(recipList));
  window.location.replace("./index.html");
};

const init = (indexRecipe) => {
  const recipeList = JSON.parse(sessionStorage.getItem("recipes-list"));
  const recipeToEdit = recipeList[indexRecipe];
  document.getElementById("title").value = recipeToEdit.name;
  document.getElementById("url").value = recipeToEdit.photo;
  const optionList = document.querySelectorAll("#category option");
  optionList.forEach((option) => {
    if (option.attributes.value.value === recipeToEdit.category) {
      option.setAttribute("selected", "selected");
    }
  });
  document.getElementById("number-of-persons").value = recipeToEdit.persons;
  document.getElementById("prep-timing").value =
    recipeToEdit.prepTiming.duration;
  document.getElementById("rest-timing").value =
    recipeToEdit.restTiming.duration;
  document.getElementById("cook-timing").value =
    recipeToEdit.cookTiming.duration;
  recipeToEdit.ingredients.forEach((ingredient, index) => {
    createIngredient();
    const currentIngredient = document.querySelectorAll("#ingredients-list li")[
      index
    ];
    currentIngredient.querySelector("[data-id='ingredient-name']").value =
      ingredient.name;
    currentIngredient.querySelector("[data-id='ingredient-quantity']").value =
      ingredient.quantity;
    currentIngredient.querySelectorAll("option").forEach((option) => {
      if (option.attributes.value.value === ingredient.value) {
        option.setAttribute("selected", "selected");
      }
    });
    currentIngredient.querySelector("[data-id='ingredient-unit']").value =
      ingredient.unit;
  });
  recipeToEdit.steps.forEach((step, index) => {
    createStep();
    const currentStep = document.querySelectorAll("#step-list li")[index];
    currentStep.querySelector("[data-id='step-description'").value = step;
  });
  document.getElementById("submit-button").value = "Modifier la recette";
};

const idToEdit = () => {
  const urlCurrent = document.location.href;
  let url = new URL(urlCurrent);
  return parseInt(url.searchParams.get("id")) - 1;
};

document
  .getElementById("add-ingredient")
  .addEventListener("click", createIngredient);

document.getElementById("add-step").addEventListener("click", createStep);

document.querySelector("#form-recipe").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isNaN(idToEdit())) {
    updateRecipes();
  } else {
    addNewRecipe();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  connectButtonValue(document);
  if (!isNaN(idToEdit())) {
    init(idToEdit());
  }
});
