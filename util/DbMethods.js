const inquirer = require("inquirer");
const Department = require("../lib/Department");

class DbMethods {
  async viewAll(cntn) {
    try {
      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "ORDER BY employees.id ASC";
      console.log("Viewing all employees... \n");
      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  async addEmployee(cntn) {
    console.log("Adding another employee... \n");

    const newEmployee = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: [
          "Software Engineer",
          "Lead Engineer",
          "Accountant",
          "Sales Lead",
          "Salesperson",
          "Lawyer",
          "Legal Team Lead",
        ],
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the employee's manager?",
      },
    ]);
    console.log(newEmployee);

    const { first_name, last_name, role_id, manager_id } = newEmployee;
    cntn.query(
      "INSERT INTO employees SET ?",
      {
        first_name: first_name,
        last_name: last_name,
        role_id: this.handleRole(role_id),
        manager_id: manager_id,
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " employees inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

  handleRole(answer) {
    switch (answer) {
      case "Software Engineer":
        return 1;
      case "Lead Engineer":
        return 2;
      case "Sales Lead":
        return 3;
      case "Salesperson":
        return 4;
      case "Lawyer":
        return 5;
      case "Legal Team Lead":
        return 6;
    }
  }

  async viewByDept(cntn) {
    try {
      const selectDept = await inquirer.prompt({
        type: "list",
        name: "viewDept",
        message: "Which department would you like to view?",
        choices: ["Engineering", "Finance", "Sales", "Legal"],
      });
      const { viewDept } = selectDept;

      const deptChoice = this.handleDept(viewDept);

      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "WHERE roles.department_id = " + deptChoice;
      query += " ORDER BY employees.id ASC";

      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  handleDept(dept) {
    switch (dept) {
      case "Engineering":
        return 1;
      case "Finance":
        return 2;
      case "Sales":
        return 3;
      case "Legal":
        return 3;
    }
  }
}

module.exports = DbMethods;
