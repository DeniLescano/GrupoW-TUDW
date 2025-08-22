import ApiManager from "./apiManager.js";
import FileManager from "./fileManager.js";
import MenuSystem from "./menuSystem.js";

const api = new ApiManager("https://fakestoreapi.com");
const file = new FileManager("productos.json");

const menu = new MenuSystem(api, file);
menu.showMenu();