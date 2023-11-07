import * as bootstrap from 'bootstrap'

export class UI {
    authModal = new bootstrap.Modal(document.getElementById('authModal'));

    toogleModal(message) {
        this.authModal._element.children[0].children[0].children[1].textContent = message;
        this.authModal.toggle();
    }
}