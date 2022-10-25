import { TOKEN } from "../constants";
import convertToken from "./convertToken";
import { getLocal } from "./utilitiesLocal";

const utilitiesToken = {
  getName: () => {
    return getLocal(TOKEN) ? convertToken(getLocal(TOKEN)).username : undefined;
  },
};

export default utilitiesToken;
