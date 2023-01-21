import { DocumentReference, Firestore } from 'firebase-admin/firestore';

export class FirestoreDao {
  constructor(
    private firestore: Firestore,
  ) { }

  async update(
    docPath: string,
    data: any
  ): Promise<void> {
    const docRef: DocumentReference = this.firestore.doc(docPath);
    await docRef.set(data);
  }
}
