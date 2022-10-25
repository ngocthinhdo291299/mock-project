function convertToken(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}
export default convertToken;
