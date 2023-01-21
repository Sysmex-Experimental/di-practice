import { applicationDefault, App, Credential } from 'firebase-admin/app';
import * as firebase from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreDao } from './firestoredao';

export const getFirestore = (): Firestore => {
  const credential: Credential = applicationDefault();
  // Firebase App
  const admin: App = firebase.initializeApp({
    credential,
  });

  // Firestore
  return (admin as any).firestore();
};


export const getDAO = (firestore: Firestore) => {
  return new FirestoreDao(firestore);
}
