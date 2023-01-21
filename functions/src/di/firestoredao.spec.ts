import { FirestoreDao } from './firestoredao';

describe("FirestoreDao", () => {
  let instance: FirestoreDao;
  let firestoreSpy: any;

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj("firestore", [
      "doc"
    ]);
    firestoreSpy.doc.and.returnValue({
      "set": jasmine.createSpy("doc_set")
    })

    instance = new FirestoreDao(firestoreSpy);
  });

  it ("should save the data correctly", async () => {

    await instance.update("/case/success", {
      "hello": "world",
    });

    expect(firestoreSpy.doc).toHaveBeenCalledOnceWith("/case/success");
    expect(firestoreSpy.doc().set).toHaveBeenCalledOnceWith({
      "hello": "world",
    });
  });

});
