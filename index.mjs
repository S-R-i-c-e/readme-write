import inquirer from 'inquirer';
import fs from "fs/promises"

import licenceSpiel from './licences.js';
import questions from './questions.js';
import links from './links.js';

let myQuestions = questions();

let {title, description, installation, usage, licence, contributors, tests, githubUser, repository, hasWebpage, email} = await inquirer
    .prompt(myQuestions);

let {licenceWords, licenceBadge} = licenceSpiel(licence, contributors);
let {user, myRepo, myEmail, myWebpage} = links(githubUser, repository, email, hasWebpage);

// function links(userName, repos, emailAddress, webpageExists) {
//     let linkGit = `#### GitHub: [@${userName}](https://api.github.com/users/${userName})`;
//     let linkEmail = `#### [email](${emailAddress})`;
//     let linkRepo = `#### [repo](https://github.com/${userName}/${repos})`;
//     let linkWebpage = '';
//     if (webpageExists) {
//         linkWebpage = `#### [webpage](https://${userName}.github.io/${repos}/)`;
//     }
//     return {user: linkGit, myEmail: linkEmail, myRepo: linkRepo, myWebpage: linkWebpage};
// }

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