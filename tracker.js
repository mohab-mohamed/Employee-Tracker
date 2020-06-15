const mysql = require("mysql");
const inquirer = require("inquirer");
const DbMethods = require("./util/DbMethods");

const DbHelperMethods = new DbMethods();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_trackerDB",
});

connection.connect(async (err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  await start();
});

async function start() {
  try {
    const todo = await inquirer.prompt({
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee"
      ],
    });
    const { userChoice } = todo;
    switch (userChoice) {
      case "View all Employees":
        await DbHelperMethods.viewAll(connection);
        await start();
        break;
      case "View all Employees by Department":
        await DbHelperMethods.viewByDept(connection);
        await start();
        break;
      case "Add Employee":
        await DbHelperMethods.addEmployee(connection);
        await start();
        break;
      
      default:
        break;
    }
    return userChoice;
  } catch (err) {
    throw err;
  }
}
