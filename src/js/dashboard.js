import { UI } from "./ui";

export default function Dashboard() {
  const signOutBtn = document.querySelectorAll("svg#signOutBtn");
  const signOutOkBtn = document.querySelector(
    "#signOutModal .modal-footer button:last-child"
  );
  const menuItems = document.querySelectorAll('.dashboardMenu  a');
  let activeMenu = "";

  const ui = new UI();

  const removeMenu = (e) => {
    let activeItem;
    if(e.target.classList.contains('dropdown-item')) {
        const dropDownMenuItems = document.querySelectorAll('.dropdown-menu a');
        activeItem = Array.from(dropDownMenuItems).find(item => item.textContent === activeMenu);

    } else {
        activeItem = Array.from(e.target.parentElement.children).find(item => item.textContent === activeMenu);
    }
    activeItem.classList.remove('active');
  }

  const setMenu = (e) => {
    activeMenu && removeMenu(e);
    e.target.classList.add('active');
    activeMenu = e.target.textContent;
  }

  
  const signOut = () => {
    ui.toggleSignOutModal();
    signOutOkBtn.addEventListener('click', () => {
      window.location.pathname = "/";
    });
  }

  const eventListeners = () => {
    signOutBtn.forEach(btn => btn.addEventListener('click', signOut));
    menuItems.forEach(item => item.addEventListener('click', setMenu));
  }

  eventListeners();
}
