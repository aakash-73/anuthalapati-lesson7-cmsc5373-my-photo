import { homePageView } from "../view/home_page.js";
import { Menu2PageView } from "../view/menu2_page.js";
import { singOutFirebase } from "./firebase_auth.js";

export function onClickHomeMenu(e) {
    homePageView();
}

export function onClickMenu2Menu(e) {
    Menu2PageView();
}

export async function onClickSignoutMenu(e){
    await singOutFirebase(e);
}