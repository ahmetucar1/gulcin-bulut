import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

function getFirebaseAdminApp() {
  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";
  if (!adminEnabled) {
    return null;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  if (getApps().length) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket
  });
}

const adminApp = getFirebaseAdminApp();

export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminBucket = adminApp ? getStorage(adminApp).bucket() : null;
export const adminAuth = adminApp ? getAuth(adminApp) : null;
