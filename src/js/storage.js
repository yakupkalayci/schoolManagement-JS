export class Storage {
    setLocalStorage(key,value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key)  {
        return JSON.parse(localStorage.getItem(key));
    }

    setSessionStorage(key,value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getSessionStorage(key)  {
        return JSON.parse(sessionStorage.getItem(key));
    }
}