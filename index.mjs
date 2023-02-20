import inquirer from 'inquirer';
import fs from "fs/promises"

import licenceSpiel from './licences.js';
import questions from './questions.js';

// const questions = [
//     {
//         "type": "input",
//         "name": "title",
//         "message": "What's the title of the project?",
//     },
//     {
//         "type": "input",
//         "name": "description",
//         "message": "Describe the project:"
//     },
//     {
//         "type": "input",
//         "name": "installation",
//         "message": "How is the project installed?"
//     },
//     {
//         "type": "input",
//         "name": "usage",
//         "message": "Provide instructions for the project:"
//     },
//     {
//         "type": "list",
//         "name": "licence",
//         "message": "Select a licence.",
//         "choices": ["MIT",
//                 "Apache 2.0"
//         ]
//     },
//     {
//         "type": "input",
//         "name": "contributors",
//         "message": "List the contributors to the project:"
//     },
//     {
//         "type": "input",
//         "name": "tests",
//         "message": "Enter testing information",
//         filter(testAnswer) {
//             if(testAnswer==="") {
//                 return false;
//             }
//             return testAnswer;
//         }
//     },
//     {
//         "type": "input",
//         "name": "githubUser",
//         "message": "Please enter your Github username:"
//     },
//     {
//         "type": "input",
//         "name": "repository",
//         "message": "Please enter the name of the repository:"
//     },
//     {
//         "type": "confirm",
//         "name": "hasWebpage",
//         "message": "Does the repo have a github webpage?"
//     },
//     {
//         "type": "input",
//         "name": "email",
//         "message": "Enter your email address",
//         validate(emailAddr) {
//             const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if(!emailValidator.test(emailAddr)) {
//                 return "please provide a valid address.";
//             }
//             return true;
//         }
//     }
// ];

let myQuestions = questions();

let {title, description, installation, usage, licence, contributors, tests, githubUser, repository, hasWebpage, email} = await inquirer
    .prompt(myQuestions);

let {licenceWords, licenceBadge} = licenceSpiel(licence, contributors);
let {user, myRepo, myEmail, myWebpage} = githubLinks(githubUser, repository, email, hasWebpage);

function githubLinks(userName, repos, emailAddress, webpageExists) {
    let linkGit = `#### GitHub: [@${userName}](https://api.github.com/users/${userName})`;
    let linkEmail = `#### [email](${emailAddress})`;
    let linkRepo = `#### [repo](https://github.com/${userName}/${repos})`;
    let linkWebpage = '';
    if (webpageExists) {
        linkWebpage = `#### [webpage](https://${userName}.github.io/${repos}/)`;
    }
    return {user: linkGit, myEmail: linkEmail, myRepo: linkRepo, myWebpage: linkWebpage};
}

let readmeDocument =  `
# ${title}

${description}

<!-- ${licenceBadge} -->

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Licence](#licence)
4. [Contributors](#contributors)
5. [Tests](#tests)
6. [Questions](#questions)

### [Installation](#installation)

${installation}

### [Usage](#usage)

${usage}

### [Licence](#licence)

${licenceWords}

### [Contributors](#contributors)

${contributors}

### [Tests](#tests)

${tests}

### [Questions](#questions)

Any Questions, then please contact me.
${user}
${myEmail}
${myRepo}
${myWebpage}
`

await fs.writeFile("README.md", readmeDocument);

function removeWhiteSpace(str) {
    return str.replace(/[\s\r\n]+/g, "");
}