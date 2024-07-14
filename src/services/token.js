export const getLoginToken = () => {
    return localStorage.getItem("dropship-admin") || "";
}

export const setLoginToken = (token) => {
    return localStorage.setItem("dropship-admin", token);
}