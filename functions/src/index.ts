import * as express from 'express';
import { onRequest, Request } from 'firebase-functions/v2/https';
import { Firestore } from 'firebase-admin/firestore';
import { getFirestore, getDAO } from './di/factory';
import { FirestoreDao } from './di/firestoredao';

export class SubmitFormViewModel {
  constructor(
    private db: FirestoreDao,
  ) { }

  async onSubmitForm(
    request: Request,
    response: express.Response,
  ): Promise<void> {
    const docPath: string = `form/${Date.now()}`;
    const data: any = request.body;

    await db.update(docPath, data);

    response.json({
      "status": "success"
    });
  }
}
export const submitform = onRequest(async (request: Request, response: express.Response) => {
  const firestore: Firestore = getFirestore();
  const db: FirestoreDao = getDAO(firestore);

  const view = new SubmitFormViewModel(db);
  await view.onSubmitForm(req, res).catch((e) => {
    response.status(400).json({
      "status": "error",
    });
  });
});
