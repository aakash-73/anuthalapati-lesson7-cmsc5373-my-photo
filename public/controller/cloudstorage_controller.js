import {
    getStorage, ref, uploadBytes, getDownloadURL
 } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"

 import { app } from "./firebase_core.js";
 import { currentUser } from "./firebase_auth.js";

 const IMAGE_FOLDER = 'image_folder';

 const storage = getStorage(app);

 export async function uploadImage(imageFile, imageName) {
    if(!imageName) {
        imageName = '' + Date.now() + Math.random();
        imageName = imageName.replace('.','-');
    }

    const imagePath = `${IMAGE_FOLDER}/${currentUser.uid}/${imageName}`;
    const storageRef = ref(storage, imagePath);
    const snapShot = await uploadBytes(storageRef, imageFile);
    const imageURL = await getDownloadURL(snapShot.ref);
    return {imageName, imageURL};

}