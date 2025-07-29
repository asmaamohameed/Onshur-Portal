import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase"; // adjust if your firebase export is different

const db = getFirestore(app);

export async function getUserProfile(uid: string) {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
}

export async function updateUserProfile(uid: string, data: any) {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}