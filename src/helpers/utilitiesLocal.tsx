function getLocal(key: string) {
  return JSON.parse(localStorage.getItem(key) || "null");
}
function setLocal(key: string, data: any) {
  return localStorage.setItem(key, JSON.stringify(data));
}
export { getLocal, setLocal };
