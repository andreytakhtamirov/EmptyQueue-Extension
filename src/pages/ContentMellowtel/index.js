import Mellowtel from "mellowtel";
import { CONFIGURATION_KEY } from "../../constants";

(async () => {
    const mellowtel = new Mellowtel(CONFIGURATION_KEY);
    await mellowtel.initContentScript();
})();