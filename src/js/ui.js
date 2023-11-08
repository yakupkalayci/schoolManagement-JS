import * as bootstrap from 'bootstrap'

export class UI {
    toggleAuthModal(message) {
        const authModal = bootstrap.Modal.getOrCreateInstance('#authModal');
        authModal._element.children[0].children[0].children[1].textContent = message;
        authModal.toggle();
    }

    toggleSignOutModal() {
        const signOutModal = bootstrap.Modal.getOrCreateInstance('#signOutModal');
        signOutModal.toggle();
    }
}