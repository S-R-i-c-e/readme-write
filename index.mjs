import inquirer from 'inquirer';
//import fs from "fs";
import fs from "fs/promises"

let questionsText = await fs.readFile('./assets/questions.txt', { encoding: "utf8", flag: "r" });
//let questionsArray = removeWhiteSpace(questionsText);

let questionsArray =  JSON.parse(removeWhiteSpace(questionsText));
console.log(questionsArray);
// let {title, description, installation, usage, licence, contributors, tests, questions} = await inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: "What's the title of the project?",
//         },
//         {
//             type: 'input',
//             name: 'description',
//             message: "Describe the project:",
//         },
//         {
//             type: 'input',
//             name: 'installation',
//             message: "How is the project installed?",
//         },
//         {
//             type: 'input',
//             name: 'usage',
//             message: "Provide instructions for the project:",
//         },
//         {
//             type: 'input',
//             name: 'licence',
//             message: "Select a licence.",
//         },
//         {
//             type: 'input',
//             name: 'contributors',
//             message: "List the contributors to the Meproject:",
//         },
//         {
//             type: 'input',
//             name: 'tests',
//             message: "Enter testing information",
//         },
//         {
//             type: 'input',
//             name: 'questions',
//             message: "GitHub link:",
//         },
//     ]);

    
//   let readmeDocument =  `
// # Project - ${title}

// ${description}

// ## Table of Contents

// 1. [Installation](#installation)
// 2. [Usage](#usage)
// 3. [Licence](#licence)
// 4. [Contributors](#contributors)
// 5. [Tests](#tests)
// 6. [Questions](#questions)

// ### [Installation](#installation)

// ${installation}

// ### [Usage](#usage)

// ${usage}

// ### [Licence](#licence)

// ${licence}

// ### [Contributors](#contributors)

// ${contributors}

// ### [Tests](#tests)

// ${tests}

// ### [Questions](#questions)

// ${questions}
//     `

//     await fs.writeFile("README.md", readmeDocument)

function removeWhiteSpace(str) {
    return str.replace(/[\s\r\n]+/g, "");
}