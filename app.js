const fs = require("fs");
const inquirer = require("inquirer");

let renderFile = require("./render");

const generateManager = renderFile.createManager;
const generateEngineer = renderFile.createEngineer;
const generateIntern = renderFile.createIntern;
const renderHTML = renderFile.renderMain;

function askQuestions() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "list",
            message: "What is your role?",
            name: "role",
            choices: ["Intern", "Engineer", "Manager"],
        },
        {
            type: "number",
            message: "What is your ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        }
    ])
    .then(function({ name, role, id, email }) {
        switch (role) {
            case "engineer":
                inquier
                .prompt(
                    {
                        type: "input",
                        message: "What is your GitHub username?",
                        name: "github"
                    }
                ).then(function({ github }) {
                    generateEngineer(name, id, email, github)
                    addOtherMembers();
                })
                break
                case "Intern":
                    inquirer
                    .prompt(
                        {
                            type: "input",
                            message: "What school do you attend?",
                            name: "school"
                        }
                    ).then(function({ school }) {
                        generateIntern(name, id, email, school)
                        addOtherMembers();
                    })
                    break
                    case "Manager":
                        inquirer
                        .prompt(
                            {
                                type: "input",
                                message: "What is your office number?",
                                name: "officeNumber"
                            }
                        ).then(function({ officeNumber }) {
                            generateManager(name, id, email, officeNumber)
                            addOtherMembers();
                        })
                        break
        }        
    })
}

function addOtherMembers() {
    inquirer
    .prompt(
        {
            type: "confirm",
            message: "Do you want to add more Team Members?",
            name: "addOtherMembers"
        }
    ).then(function({ addOtherMembers}) {
        console.log("add members", addOtherMembers);
        if (addOtherMembers) {
            askQuestions();
        }else {
            renderHTML();
        }
    })
    .catch(err => {
        console.log("There was an error adding members.", err)
        throw err
    })
}

askQuestions();