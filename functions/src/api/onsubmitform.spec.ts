import { OnSubmitFormViewModel } from './onsubmitform';

describe("onSubmitForm", () => {
  let instance: OnSubmitFormViewModel;
  let dbSpy: any;
  let reqSpy: any;
  let resSpy: any;

  beforeEach(() => {
    dbSpy = jasmine.createSpyObj("FirestoreDao", [
      "update"
    ]);

    reqSpy = jasmine.createSpyObj("Request", [], {
      "body": {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3",
      }
    });

    resSpy = jasmine.createSpyObj("Respose", ["status", "json"]);
    resSpy.status.and.returnValue({
      json: jasmine.createSpy('Response.end').and.stub()
    });
    resSpy.json = jasmine.createSpy("json");

    instance = new OnSubmitFormViewModel(dbSpy);
  });

  it("should return the success response", async () => {

    await instance.onSubmitForm(reqSpy, resSpy);

    expect(dbSpy.update).toHaveBeenCalledTimes(1);
    expect(dbSpy.update).toHaveBeenCalledOnceWith(jasmine.any(String), jasmine.any(Object));

    expect(resSpy.json).toHaveBeenCalledOnceWith({
      "status": "success"
    });
  });

  it("should return the error response", async () => {
    dbSpy.update.and.callFake(() => {
      throw "something occurred";
    });

    await instance.onSubmitForm(reqSpy, resSpy);

    expect(resSpy.status().json).toHaveBeenCalledOnceWith({
      "status": "error"
    });
  });
});
