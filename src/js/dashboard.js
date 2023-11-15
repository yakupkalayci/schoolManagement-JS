import { UI } from "./ui";
import { Auth } from "./auth";
import { Firebase } from "./firebase";
import { Storage } from "./storage";

export default function Dashboard() {
  const signOutBtn = document.querySelectorAll("svg#signOutBtn");
  const signOutOkBtn = document.querySelector(
    "#signOutModal .modal-footer button:last-child"
  );
  const addClassBtns = document.querySelectorAll('.addClassBtn');
  const menuItems = document.querySelectorAll(".dashboardMenu  a");
  let activeMenu = "";

  const ui = new UI();
  const auth = new Auth();
  const firebase = new Firebase();
  const storage = new Storage();

  const activeUserId = storage.getSessionStorage("activeUser");

  const removeMenu = (e) => {
    let activeItem;
    if (e.target.classList.contains("dropdown-item")) {
      const dropDownMenuItems = document.querySelectorAll(".dropdown-menu a");
      activeItem = Array.from(dropDownMenuItems).find(
        (item) => item.textContent === activeMenu
      );
    } else {
      activeItem = Array.from(e.target.parentElement.children).find(
        (item) => item.textContent === activeMenu
      );
    }
    activeItem.classList.remove("active");
  };

  const setMenu = (e) => {
    activeMenu && removeMenu(e);
    e.target.classList.add("active");
    activeMenu = e.target.textContent;
    changeContent();
  };

  const changeContent = () => {
    ui.clearDashboardContent();
    ui.setDashboardLayout(activeMenu);
    switch (activeMenu) {
      case "Sınıflarım":
        getClasses();
        break;
      default:
        break;
    }
  };

  const getClasses = () => {
    let classes;
    firebase
      .getClasses(activeUserId)
      .then((val) => {
        classes = val;
      })
      .catch((err) => {
        console.log(err);
      });

      if(classes) {
        console.log(classes);
      } else {
        ui.noClassScreen();
      }
  };

  const signOut = () => {
    ui.toggleSignOutModal();
    signOutOkBtn.addEventListener("click", () => {
      auth.signOut();
    });
  };

  const addClass = () => {
    ui.toggleAddClasModal();
    const addClassSaveBtn = document.querySelector('#addClassModal .modal-footer > button:last-child');
    const addClassName = document.querySelector('#addClassModal input#className');
    addClassSaveBtn.addEventListener('click', () => {
      if(addClassName.value) {
        firebase.addNewClass(activeUserId, addClassName.value).then(() => console.log("eklendi")).catch(err => console.log(err));
      }
    });
  }

  const eventListeners = () => {
    signOutBtn.forEach((btn) => btn.addEventListener("click", signOut));
    menuItems.forEach((item) => item.addEventListener("click", setMenu));
    addClassBtns.forEach(btn => btn.addEventListener('click', addClass));
  };

  eventListeners();
}
