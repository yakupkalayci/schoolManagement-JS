import * as bootstrap from "bootstrap";

export class UI {
  toggleAuthModal(message) {
    const authModal = bootstrap.Modal.getOrCreateInstance("#authModal");
    authModal._element.children[0].children[0].children[1].textContent =
      message;
    authModal.toggle();
  }

  toggleSignOutModal() {
    const signOutModal = bootstrap.Modal.getOrCreateInstance("#signOutModal");
    signOutModal.toggle();
  }

  toggleAddClasModal() {
    const addClassModal = bootstrap.Modal.getOrCreateInstance('#addClassModal');
    addClassModal.toggle();
  }

  clearDashboardContent() {
    const container = document.querySelector("#dashboardMainContent");
    container.innerHTML = "";
  }

  setDashboardLayout(title) {
    const mainContainer = document.querySelector("#dashboardMainContent");

    mainContainer.innerHTML = `
    <div class="row border-bottom">
    <div class="col-6">
      <h5>${title}</h5>
    </div>
    <div class="col-6 text-end">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-plus-fill addClassBtn" viewBox="0 0 16 16" role="button">
        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
      </svg>    
    </div>
  </div>
  <div class="row p-3 d-flex justify-content-center" id="dashboardContent"></div>
    `;
  }

  addClassCard() {
    const container = document.querySelector("#dashboardContent");
    container.innerHTML += `
        <div class="card text-bg-dark mb-3 me-5 classRoomCard">
        <img src="../images/cardBG.jpg" class="card-img" style="opacity: 0.5;">
        <div class="card-img-overlay d-flex flex-column justify-content-around align-items-center">
          <h1 class="card-title">5-A</h1>
          <div>
            <a href="#" class="card-link text-light">İncele</a>
            <a href="#" class="card-link text-light">Sil</a>
          </div>
        </div>
      </div>
        `;
  }

  noClassScreen() {
    // const container = document.querySelector("#dashboardContent");
    // container.innerHTML = `
    // <h1>No class!</h1>
    // `
  }

}
