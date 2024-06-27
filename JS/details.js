const init = () => {
  const recipeList = JSON.parse(sessionStorage.getItem("recipes-list"));
  const currentRecipe = recipeList.find((recipe) => recipe.id === getId());
  sessionStorage.setItem(
    "current-recipe-copy",
    JSON.stringify(
      JSON.parse(sessionStorage.getItem("recipes-list"))[getId() - 1]
    )
  );
  connectButtonValue(document);
  const category = document.getElementById("category");
  categoryIcon(document, category, currentRecipe, "4xl");
  const favorite = document.getElementById("favorite");
  favoriteIcon(favorite, currentRecipe, "4xl");
  favorite.addEventListener("click", () => {
    favoriteUnfavorite(favorite, currentRecipe, "4xl");
  });
  document.querySelector("h1").innerText = currentRecipe.name;
  document.querySelector("#recipe-img").src = currentRecipe.photo;
  document.querySelector("#recipe-img").alt = currentRecipe.name + " en image";
  document.querySelector("#number-of-persons").innerText =
    currentRecipe.persons;
  document.querySelector("#number-of-persons-text").innerText =
    currentRecipe.persons === 1 ? "personne" : "personnes";
  displayIngredients(currentRecipe);
  displayTimings(currentRecipe);
  displaySteps(currentRecipe);
  displayComments(currentRecipe);
};

const displayIngredients = (currentRecipe) => {
  document.querySelector("#ingredients-list").innerHTML = "";
  currentRecipe.ingredients.forEach((ingredient) => {
    const newIngredient = document.createElement("li");
    newIngredient.classList = "flex flex-col items-center";
    const imageIngredient = document.createElement("img");
    imageIngredient.src = ingredient.photo;
    imageIngredient.alt = `image de ${ingredient.name}`;
    const quantityIngredient = document.createElement("p");
    quantityIngredient.setAttribute("data-class", "quantity-ingredient");
    quantityIngredient.innerText = ingredient.quantity;
    quantityIngredient.classList = "bold";
    quantityIngredient.classList = ingredient.quantity === "" ? "none" : "";
    const unitIngredient = document.createElement("p");
    unitIngredient.innerText = ingredient.unit;
    const containerIngredientQuantity = document.createElement("div");
    containerIngredientQuantity.classList = "flex gap-2";
    containerIngredientQuantity.append(quantityIngredient, unitIngredient);
    const ingredientName = document.createElement("p");
    ingredientName.innerText =
      ingredient.unit !== "" ? `de ${ingredient.name}` : ingredient.name;
    newIngredient.append(
      imageIngredient,
      containerIngredientQuantity,
      ingredientName
    );
    document.querySelector("#ingredients-list").append(newIngredient);
  });
};

const displayTimings = (currentRecipe) => {
  document.querySelector("#prep-timing").innerHTML =
    "<span class='font-bold'>Préparation :</span>";
  document.querySelector(
    "#rest-timing"
  ).innerHTML = `<span class="font-bold">Repos :</span>`;
  document.querySelector(
    "#cook-timing"
  ).innerHTML = `<span class="font-bold">Cuisson :</span>`;
  document.querySelector(
    "#total-timing"
  ).innerHTML = `<span class="font-bold">Temps total :</span>`;
  let hours = [];
  let min = [];
  currentRecipe.cookTiming.unit === "h"
    ? hours.push(currentRecipe.cookTiming.duration)
    : min.push(currentRecipe.cookTiming.duration);
  currentRecipe.prepTiming.unit === "h"
    ? hours.push(currentRecipe.prepTiming.duration)
    : min.push(currentRecipe.prepTiming.duration);
  currentRecipe.restTiming.unit === "h"
    ? hours.push(currentRecipe.restTiming.duration)
    : min.push(currentRecipe.restTiming.duration);
  if (hours.length === 0) {
    hours = 0;
  }
  if (min.length === 0) {
    min = 0;
  }
  let totalHours =
    hours !== 0 ? hours.reduce((acc, value) => (acc += value)) : 0;
  let totalMin =
    min !== 0 ? min.reduce((acc, value) => acc + parseInt(value), 0) : 0;
  totalMin / 60 >= 1
    ? ((totalHours += Math.floor(totalMin / 60)), (totalMin = totalMin % 60))
    : ((totalHours = totalHours), (totalMin = totalMin));
  if (totalHours >= 1) {
    document.querySelector("#total-timing").innerHTML += ` ${totalHours} h`;
  }
  if (totalMin >= 1) {
    document.querySelector("#total-timing").innerHTML += ` ${totalMin} min`;
  }
  const prepTiming = document.createElement("p");
  prepTiming.classList = "";
  prepTiming.innerText =
    currentRecipe.prepTiming.duration === 0
      ? "-"
      : `${currentRecipe.prepTiming.duration} ${currentRecipe.prepTiming.unit}`;
  document.querySelector("#prep-timing").appendChild(prepTiming);
  const restTiming = document.createElement("p");
  restTiming.innerText =
    currentRecipe.restTiming.duration === 0
      ? "-"
      : `${currentRecipe.restTiming.duration} ${currentRecipe.restTiming.unit}`;
  document.querySelector("#rest-timing").appendChild(restTiming);
  const cookTiming = document.createElement("p");
  cookTiming.innerText =
    currentRecipe.cookTiming.duration === 0
      ? "-"
      : `${currentRecipe.cookTiming.duration} ${currentRecipe.cookTiming.unit}`;
  document.querySelector("#cook-timing").appendChild(cookTiming);
};

const displaySteps = (currentRecipe) => {
  document.getElementById("steps").innerHTML = "";
  currentRecipe.steps.forEach((step, index) => {
    const stepNumber = document.createElement("p");
    stepNumber.classList = "font-bold";
    stepNumber.innerText = `ÉTAPE ${index + 1}`;
    const stepDescription = document.createElement("p");
    stepDescription.innerText = step;
    const newStep = document.createElement("li");
    newStep.append(stepNumber, stepDescription);
    document.getElementById("steps").appendChild(newStep);
  });
};

const displayComments = (currentRecipe) => {
  document.getElementById("comments").innerHTML = "";
  currentRecipe.comments.forEach((comment) => {
    const newComment = document.createElement("article");
    newComment.classList =
      "bg-slate-50 px-2 py-2 rounded-lg shadow-[0.1rem_0.1rem_0.3rem_grey]";
    const commentHeader = document.createElement("header");
    commentHeader.classList = "flex justify-between";
    const author = document.createElement("p");
    author.innerText = comment.author;
    createStars(comment.note, commentHeader);
    commentHeader.append(author);
    const commentText = document.createElement("blockquote");
    commentText.innerText = `"${comment.comment}"`;
    commentText.classList = "italic";
    newComment.append(commentHeader, commentText);
    document
      .getElementById("comments")
      .insertAdjacentElement("afterbegin", newComment);
  });
};

const resetStars = () => {
  document.querySelectorAll("[data-class='star']").forEach((star) => {
    star.classList = "fa-regular fa-star";
    star.value = 0;
  });
};

const getId = () => {
  const urlCurrent = document.location.href;
  let url = new URL(urlCurrent);
  return parseInt(url.searchParams.get("id"));
};

const createComment = () => {
  const allNotes = [];
  document
    .querySelectorAll("[data-class='star']")
    .forEach((star) => allNotes.push(star.value));
  const note = allNotes.reduce((sum, value) => (sum += value));
  const textComment = document.getElementById("comment-text").value;
  const authorName = document.getElementById("author-name").value;
  if (note !== 0 && textComment.length > 2 && authorName !== "") {
    let newComment = {
      author: authorName,
      note: note,
      comment: textComment,
    };
    const recipeList = JSON.parse(sessionStorage.getItem("recipes-list"));
    recipeList[getId() - 1].comments.push(newComment);
    sessionStorage.setItem("recipes-list", JSON.stringify(recipeList));
    document.getElementById("comment-form").reset();
    resetStars();
  }
};

const updatePortions = (number) => {
  const currentRecipeCopy = JSON.parse(
    sessionStorage.getItem("current-recipe-copy")
  );
  currentRecipeCopy.ingredients.forEach(
    (ingredient) =>
      (ingredient.quantity = !isNaN(ingredient.quantity)
        ? (ingredient.quantity / currentRecipeCopy.persons) * number.toFixed(1)
        : "")
  );
  currentRecipeCopy.persons = number;
  sessionStorage.setItem(
    "current-recipe-copy",
    JSON.stringify(currentRecipeCopy)
  );
  document.getElementById("number-of-persons").innerText =
    currentRecipeCopy.persons;
    document.querySelector("#number-of-persons-text").innerText =
    currentRecipeCopy.persons === 1 ? "personne" : "personnes";
  document
    .querySelectorAll("#ingredients-list li [data-class='quantity-ingredient']")
    .forEach(
      (p, index) =>
        (p.innerText = currentRecipeCopy.ingredients[index].quantity)
    );
};

const changeNumber = (operation) => {
  switch (operation) {
    case "+":
      return (
        JSON.parse(sessionStorage.getItem("current-recipe-copy")).persons + 1
      );
    case "-":
      if (
        JSON.parse(sessionStorage.getItem("current-recipe-copy")).persons > 1
      ) {
        return (
          JSON.parse(sessionStorage.getItem("current-recipe-copy")).persons - 1
        );
      } else {
        return JSON.parse(sessionStorage.getItem("current-recipe-copy"))
          .persons;
      }
  }
};

document.getElementById("star1").addEventListener("click", () => {
  resetStars();
  document.getElementById("star1").classList = "fa-solid fa-star";
  document.getElementById("star1").value = 1;
});

document.getElementById("star2").addEventListener("click", () => {
  resetStars();
  document.querySelectorAll("#star1, #star2").forEach((star) => {
    star.classList = "fa-solid fa-star";
    star.value = 1;
  });
});

document.getElementById("star3").addEventListener("click", () => {
  resetStars();
  document.querySelectorAll("#star1, #star2, #star3").forEach((star) => {
    star.classList = "fa-solid fa-star";
    star.value = 1;
  });
});

document.getElementById("star4").addEventListener("click", () => {
  resetStars();
  document
    .querySelectorAll("#star1, #star2, #star3, #star4")
    .forEach((star) => {
      star.classList = "fa-solid fa-star";
      star.value = 1;
    });
});

document.getElementById("star5").addEventListener("click", () => {
  document.querySelectorAll("[data-class='star']").forEach((star) => {
    star.classList = "fa-solid fa-star";
    star.value = 1;
  });
});

document.getElementById("comment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  createComment();
  init();
});

document.addEventListener("DOMContentLoaded", () => {
  init();
});

document.getElementById("less-person").addEventListener("click", () => {
  updatePortions(changeNumber("-"));
});

document.getElementById("more-person").addEventListener("click", () => {
  updatePortions(changeNumber("+"));
});
