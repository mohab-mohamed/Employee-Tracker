const Role = require("../lib/Role");
const Department = require("../lib/Department");

describe("Role", () => {
  describe("Initialization", () => {
    test("Shouldmake obj w/ with title' string, 'salary' number and 'department' object", () => {
      const department = new Department("Engineering");

      const newRole = new Role(
        "Engineer",
        75000.0,
        new Department("Engineering")
      );

      expect(newRole.title).toEqual("Engineer");
      expect(newRole.salary).toEqual(75000.0);
      expect(newRole.department).toBe({ name: "Engineer" });
    });
  });
});
