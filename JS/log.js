const log = () => {
  const labelName = document.createElement("label");
  labelName.setAttribute("for", "admin-name");
  labelName.innerText = "Nom d'utilisateur :";
  const inputName = document.createElement("input");
  inputName.id = "admin-name";
  inputName.name = "admin-name";
  const divName = document.createElement("div");
  divName.classList = "flex flex-col gap-2 font-bold";
  divName.append(labelName, inputName);
  const labelPassword = document.createElement("label");
  labelPassword.setAttribute("for", "password");
  labelPassword.innerText = "Mot de passe :";
  const inputPassword = document.createElement("input");
  inputPassword.id = "password";
  inputPassword.name = "password";
  inputPassword.type = "password";
  const divPassword = document.createElement("div");
  divPassword.classList = "flex flex-col gap-2 font-bold";
  divPassword.append(labelPassword, inputPassword);
  const errorMessage = document.createElement("p");
  const logButton = document.createElement("button");
  logButton.classList =
    "bg-[#E07D45] text-[#F2E5D3] p-2 rounded-lg text-xl font-[500] transform ease-in-out transition delay-250 duration-300 hover:shadow-[0.1rem_0.1rem_0.3rem_grey]";
  logButton.innerText = "Se connecter";
  logButton.type = "submit";
  const cancelButton = document.createElement("button");
  cancelButton.classList =
    "bg-black text-[#F2E5D3] p-2 rounded-lg text-xl transform ease-in-out transition delay-250 duration-300 hover:shadow-[0.1rem_0.1rem_0.3rem_grey]";
  cancelButton.innerText = "Retour";
  cancelButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
    document.querySelector("dialog").remove();
  });
  const divButton = document.createElement("div");
  divButton.classList = "flex justify-around gap-4";
  divButton.append(logButton, cancelButton);
  const form = document.createElement("form");
  form.id = "form-newPost";
  form.classList = "space-y-8 w-[20rem] py-8 px-4";
  form.append(divName, divPassword, errorMessage, divButton);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputName.value === "" || inputPassword === "") {
      errorMessage.innerText = "Les champs doivent être renseignés.";
    } else {
      const admins = JSON.parse(localStorage.getItem("admins"));
      if (
        admins.find((admin) => admin.email === inputName.value) === undefined ||
        admins.find((admin) => admin.email === inputName.value).password !==
          inputPassword.value
      ) {
        errorMessage.innerText = "Les champs renseignés ne sont pas valides.";
      } else {
        window.location.replace("./index.html");
        document.querySelector("dialog").close();
        document.querySelector("dialog").remove();
        document
          .querySelectorAll("[data-type='admin-buttons']")
          .forEach((recipe) => recipe.classList.remove("hidden"));
        sessionStorage.setItem("logged", JSON.stringify(true));
      }
    }
  });
  const dialog = document.createElement("dialog");
  dialog.classList =
    "p-2 rounded-lg bg-[#F6BC8C] shadow-[0.1rem_0.1rem_0.3rem_grey]";
  dialog.appendChild(form);
  document.querySelector("body").appendChild(dialog);
  document.querySelector("dialog").showModal();
};

const unlog = () => {
  const unlogMessage = document.createElement("p");
  unlogMessage.innerText = "Se déconnecter ?";
  unlogMessage.classList = "font-bold text-center";
  const unlogButton = document.createElement("button");
  unlogButton.classList =
    "bg-[#E07D45] text-[#F2E5D3] p-2 rounded-lg text-xl font-[500] transform ease-in-out transition delay-250 duration-300 hover:shadow-[0.1rem_0.1rem_0.3rem_grey]";
  unlogButton.innerText = "Oui";
  unlogButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
    document.querySelector("dialog").remove();
    document
      .querySelectorAll("[data-type='admin-buttons']")
      .forEach((recipe) => recipe.classList.add("hidden"));
    sessionStorage.setItem("logged", JSON.stringify(false));
    window.location.replace("./index.html");
  });
  const cancelButton = document.createElement("button");
  cancelButton.classList =
    "bg-black text-[#F2E5D3] p-2 rounded-lg text-xl transform ease-in-out transition delay-250 duration-300 hover:shadow-[0.1rem_0.1rem_0.3rem_grey]";
  cancelButton.innerText = "Non";
  cancelButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
    document.querySelector("dialog").remove();
  });
  const divButtons = document.createElement("div");
  divButtons.classList = "flex justify-around gap-4";
  divButtons.append(unlogButton, cancelButton);
  const dialog = document.createElement("dialog");
  dialog.classList =
    "gap-20 p-2 rounded-lg bg-[#F6BC8C] shadow-[0.1rem_0.1rem_0.3rem_grey] w-[25rem] h-[25rem] flex flex-col justify-center";
  dialog.append(unlogMessage, divButtons);
  document.querySelector("body").appendChild(dialog);

  document.querySelector("dialog").showModal();
};

const connectButtonValue=(document)=>{
  document.getElementById("connect").innerText =
  JSON.parse(sessionStorage.getItem("logged")) === false
    ? "Connexion"
    : "Se déconnecter";
}

document.getElementById("connect").addEventListener("click", () => {
  if (JSON.parse(sessionStorage.getItem("logged")) === false) {
    log();
  } else {
    unlog();
  }
});
