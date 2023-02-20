/*
 * index.mjs
 * based on command line questioning using github.com/SBoudrias/Inquirer.js constructs a readme.md file.
 */
import inquirer from 'inquirer';
import fs from "fs/promises"

// import functions from local files.
import licenceSpiel from './licences.js';
import questions from './questions.js';
import links from './links.js';

// ask away...
let myQuestions = questions();
let {title, description, installation, usage, licence, contributors, tests, githubUser, repository, hasWebpage, email} = await inquirer
    .prompt(myQuestions);

// construct the text based on the answers given.
let {licenceWords, licenceBadge} = licenceSpiel(licence, contributors);
let {user, myRepo, myEmail, myWebpage} = links(githubUser, repository, email, hasWebpage);

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
// write the README
await fs.writeFile("README.md", readmeDocument);