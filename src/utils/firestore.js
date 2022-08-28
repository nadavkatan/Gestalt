import {
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default class Collection {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, this.collectionName);
  }

  async getAllDocuments(done) {
    const docsSnap = await getDocs(this.collectionRef);
    const docs = docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    done(docs);
  }

  async getDocumentById(id) {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id,
      };
    } else {
      console.log("document not found");
    }
  }

  async getDocumentsByField(field, operator, value, done) {
    const q = query(this.collectionRef, where(field, operator, value));
    const querySnap = getDocs(q);
    const docs = querySnap.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    done(docs);
  }

  async createDocument(data) {
    await addDoc(this.collectionRef, data);
  }

  async updateDocument(id, data) {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  async deleteDocument(id) {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}

export const updateLevel = async (level) => {
  const levelsRef = collection(db, "levels");
  const q = query(levelsRef, where("level", "==", level));
  const querySnap = await getDocs(q);
  const data = querySnap.docs[0].data();
  console.log(data);
};

export const getDocumentsByQuery = async (collectionName, field, value) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(field, "==", value));
  const querySnap = await getDocs(q);
  const data = querySnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

export const getCollection = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const docsSnap = await getDocs(collectionRef);
  const docs = docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return docs;
};

export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const createDocument = async (collectionName, data) => {
  const collectionRef = collection(db, collectionName);
  await addDoc(collectionRef, data);
};
