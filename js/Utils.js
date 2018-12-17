export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const getElementId = (target, value = false) => {
    const element = document.getElementById(target);
    return value ? element.value : element;
};
