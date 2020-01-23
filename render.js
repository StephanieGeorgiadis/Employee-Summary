const fs = require("fs");
const path = require("path");

const templateDir = "./templates/";
const employeeGen = require("./lib/employee");

const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/Manager");

let teamMembers = "";

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templateDir, "manager.html"), "utf8");
    let managerHTML = "";
    managerHTML = managerHTML + template.replace(/{{ name }}/g, manager.getName())
    .replace(/{{ role }}/g, manager.getRole())
    .replace(/{{ email }}/g, manager.getEmail())
    .replace(/{{ id }}/g, manager.getId())
    .replace(/{{ officeNumber }}/g, manager.getofficeNumber())
    teamMembers = teamMembers + managerHTML;
};

const renderEnigneer = enigneer => {
    let template = fs.readFileSync(path.resolve(templateDir, "enigneer.html"), "utf8");
    let enigneerHTML = "";
    enigneerHTML = enigneerHTML + template.replace(/{{ name }}/g, enigneer.getName())
    .replace(/{{ role }}/g, enigneer.getRole())
    .replace(/{{ email }}/g, enigneer.getEmail())
    .replace(/{{ id }}/g, enigneer.getId())
    .replace(/{{ github }}/g, enigneer.getGithub())
    teamMembers = teamMembers + enigneerHTML;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templateDir, "intern.html"), "utf8");
    let internHTML = "";
    internHTML = internHTML + template.replace(/{{ name }}/g, intern.getName())
    .replace(/{{ role }}/g, intern.getRole())
    .replace(/{{ email }}/g, intern.getEmail())
    .replace(/{{ id }}/g, intern.getId())
    .replace(/{{ school }}/g, intern.getSchool())
    teamMembers = teamMembers + internHTML;
};

function createManager(name, id, email, officeNumber) {
    const manager = new Manager(name, id, email, officeNumber)
    renderManager(manager);
}

function createEngineer(name, id, email, github) {
    const engineer = new Engineer(name, id, email, github)
    renderEnigneer(engineer);
}

function createIntern(name, id, email, school) {
    const intern = new Intern(name, id, email, school)
    renderIntern(intern);
}

function renderMain() {
    let mainTemplate = fs.readFileSync(path.resolve(templateDir, "main.html"), "utf8");
    var mainHTML = "";
    mainHTML = mainHTML + mainTemplate.replace(/{{ team }}/g, teamMembers)
    let file = path.join('./output', "/index.html");
    console.log(file);

    fs.writeFile(file, mainHTML, function(err) {
        if (err) {
            throw new Error(err)
        }
        console.log("Finished writing file.");
    })
}

module.exports = {
    createManager: createManager,
    createEngineer: createEngineer,
    createIntern: createIntern,
    renderMain: renderMain
}
