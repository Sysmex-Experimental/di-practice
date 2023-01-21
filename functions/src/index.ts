import * as express from 'express';
import { onRequest, Request } from 'firebase-functions/v2/https';
import { DocumentReference, Firestore } from 'firebase-admin/firestore';

import { applicationDefault, App, Credential } from 'firebase-admin/app';
import * as firebase from 'firebase-admin';

const credential: Credential = applicationDefault();
// Firebase App
const admin: App = firebase.initializeApp({
  credential,
});

// Firestore
const firestore: Firestore = (admin as any).firestore();

export const submitform = onRequest(async (request: Request, response: express.Response) => {
  const docRef: DocumentReference = firestore.doc(`form/${Date.now()}`)
  await docRef.set(request.body);

  response.json({
    "status": "success"
  });
});
