import { 
    getFirestore, collection, addDoc, query,
    where, orderBy, getDocs,  
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

import { app } from "./firebase_core.js"
import { PhotoMemo } from "../model/PhotoMemo.js";

const PHOTOMEMO_COLL = 'photomemo_collection';

const db = getFirestore(app);

export async function addPhotoMemo(photoMemo) {
    const collRef = collection(db, PHOTOMEMO_COLL);
    const docRef = await addDoc(collRef, photoMemo.toFirestore());
    return docRef.id; // auto generated doc id in Firestore
}

export async function getPhotoMemoList(uid) {
    let photoMemoList = [];
    const coll = collection(db, PHOTOMEMO_COLL);
    const q = query(coll,
             where('uid', '==', uid),
             orderBy('timestamp', 'desc'),);
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const p = new PhotoMemo(doc.data());
        p.set_docId(doc.id);
        photoMemoList.push(p);
    });
    return photoMemoList;
}