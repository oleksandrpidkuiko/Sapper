export const setSessionStorage = (key, value) => sessionStorage.setItem(key, value);

export const getSessionStorage = (key) => JSON.parse(sessionStorage.getItem(key));

export const getElementValue = (target) => {
    return document.getElementById(target).value;
};

export const showElement = (target) => {
    target.style.display = 'block';
};
