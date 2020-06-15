const Department = require("../lib/Department");

describe("Department", () => {
  describe("Initialization", () => {
    test("Should make object w/ 'name' string", () => {
      const name = "Engineering";
      const department = new Department(name);

      expect(department.name).toEqual("Engineering");
    });
  });
});
