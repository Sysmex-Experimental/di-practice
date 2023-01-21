import * as express from 'express';
import { onRequest, Request } from 'firebase-functions/v2/https';
import { Firestore } from 'firebase-admin/firestore';
import { getFirestore, getDAO } from '../di/factory';
import { FirestoreDao } from '../di/firestoredao';

export class OnSubmitFormViewModel {
  constructor(
    private db: FirestoreDao,
  ) { }

  async onSubmitForm(
    request: Request,
    response: express.Response,
  ): Promise<void> {
    const docPath: string = `form/${Date.now()}`;
    const data: any = request.body;

    try {
      await this.db.update(docPath, data);
      response.json({
        "status": "success"
      });
    } catch (e) {
      response.status(400).json({
        "status": "error",
      });
    }

  }
}
export const onsubmitform = onRequest(async (request: Request, response: express.Response) => {
  const firestore: Firestore = getFirestore();
  const db: FirestoreDao = getDAO(firestore);

  const view = new OnSubmitFormViewModel(db);
  await view.onSubmitForm(request, response);
});
