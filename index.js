let globalPlayerData = [];
playerContents = document.getElementById("playersRow");

const addPlayer = () => {
  const newPlayerDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("playerImageURL").value,
    name: document.getElementById("playerName").value,
    type: document.getElementById("playerType").value,
    match: document.getElementById("matches").value,
    runs: document.getElementById("runs").value,
    sr: document.getElementById("strikeRate").value,
  };
  //   playerContents = document.getElementById("playersRow");
  playerContents.insertAdjacentHTML(
    "beforeend",
    generatePlayerCard(newPlayerDetails)
  );

  globalPlayerData.push(newPlayerDetails);
  saveToLocalStorage();
};

const generatePlayerCard = ({ id, name, url, type, match, runs, sr }) => {
  return `<div class=" col-lg-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-image position-relative overflow-hidden">
                <img src=${url} class="card-img-top mt-3" alt="image" />
                <div class="edit_delete_icons position-absolute">
                    <button type="button" class="btn btn-outline-light btn-sm" name=${id} onclick="editPlayer(this);">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" name=${id} onclick="deletePlayer(this);">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="card-body bg-dark text-uppercase">
                <h1 class="card-title">${name}</h2>
                <span class="badge bg-danger">${type}</span>
                <div class="stats d-flex justify-content-around mt-3 ">
                    <div class="d-flex flex-column align-items-center">
                        <span class="fs-4">${match} </span>
                        <span class="stats-content">MATCHES</span>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <span class="fs-4">${runs}</span>
                        <span class="stats-content">RUNS | WICKETS</span>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <span class="fs-4">${sr}</span>
                        <span class="stats-content">S/R | ECO</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

const saveToLocalStorage = () => {
  localStorage.setItem(
    "RCBplayers",
    JSON.stringify({ players: globalPlayerData })
  );
};

const reloadPlayerCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("RCBplayers"));
  if (localStorageCopy) {
    globalPlayerData = localStorageCopy["players"];
  }
  console.log(globalPlayerData);
  globalPlayerData.map((playerData) => {
    playerContents.insertAdjacentHTML(
      "beforeend",
      generatePlayerCard(playerData)
    );
  });
};

const deletePlayer = (e) => {
  console.log(e);
  const targetID = e.getAttribute("name");
  console.log(targetID);
  globalPlayerData = globalPlayerData.filter(
    (playerData) => playerData.id !== targetID
  );
  console.log(globalPlayerData);
  saveToLocalStorage();
  window.location.reload();
};

const editPlayer = (e) => {
  console.log(e);
  // console.log(e.tagName);
  // const elementType = e.tagName;

  let parentElement;
  let playerName;
  let playerType;
  let match;
  let runs;
  let sr;

  e.childNodes[1].classList.remove("fa-pencil-alt");
  e.childNodes[1].classList.add("fa-check");

  parentElement = e.parentNode.parentNode.parentNode;

  playerName = parentElement.childNodes[3].childNodes[1];
  playerType = parentElement.childNodes[3].childNodes[3];
  match = parentElement.childNodes[3].childNodes[5].childNodes[1].childNodes[1];
  runs = parentElement.childNodes[3].childNodes[5].childNodes[3].childNodes[1];
  sr = parentElement.childNodes[3].childNodes[5].childNodes[5].childNodes[1];

  playerName.setAttribute("contenteditable", "true");
  playerType.setAttribute("contenteditable", "true");
  match.setAttribute("contenteditable", "true");
  runs.setAttribute("contenteditable", "true");
  sr.setAttribute("contenteditable", "true");

  playerName.focus();
  console.log(e.childNodes[1]);
  e.setAttribute("onclick", "saveEditedPlayer(this)");
};

const saveEditedPlayer = (e) => {
  console.log(e);
  const targetID = e.getAttribute("name");
  console.log(targetID);
  const elementType = e.tagName;
  // console.log(elementType);
  let parentElement;

  parentElement = e.parentNode.parentNode.parentNode;

  const playerName = parentElement.childNodes[3].childNodes[1];
  const playerType = parentElement.childNodes[3].childNodes[3];
  const match =
    parentElement.childNodes[3].childNodes[5].childNodes[1].childNodes[1];
  const runs =
    parentElement.childNodes[3].childNodes[5].childNodes[3].childNodes[1];
  const sr =
    parentElement.childNodes[3].childNodes[5].childNodes[5].childNodes[1];

  const updatedPlayerData = {
    name: playerName.innerHTML,
    type: playerType.innerHTML,
    match: match.innerHTML,
    runs: runs.innerHTML,
    sr: sr.innerHTML,
  };

  console.log({ updatedPlayerData, targetID });

  const updateGlobalPlayers = globalPlayerData.map((task) => {
    if (task.id === targetID) {
      console.log({ ...task, ...updatedPlayerData });
      return { ...task, ...updatedPlayerData };
    }
    return task;
  });

  globalPlayerData = updateGlobalPlayers;

  saveToLocalStorage();

  playerName.setAttribute("contenteditable", "false");
  playerType.setAttribute("contenteditable", "false");
  match.setAttribute("contenteditable", "false");
  runs.setAttribute("contenteditable", "false");
  sr.setAttribute("contenteditable", "false");

  console.log(e.childNodes[1].classList);
  e.childNodes[1].classList.remove("fa-check");
  e.childNodes[1].classList.add("fa-pencil-alt");
  e.setAttribute("onclick", "editPlayer(this)");

  // window.location.reload();
};
