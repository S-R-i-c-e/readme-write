import inquirer from 'inquirer';
import fs from "fs/promises"

/*
 * Reading the questions from file requires they be parsed and that means the validate(), filter(), and when()
 * functions cannot be read - so not really a good idea.
 */
// let questionsTxt;
// try {
//     questionsTxt = await fs.readFile('./assets/questions.txt', 'utf-8');
// } catch (error) {
//     console.error('there was an error reading questions.txt:', error.message);
// }
// let questions = JSON.parse(questionsTxt);

const questions = [
    {
        "type": "input",
        "name": "title",
        "message": "What's the title of the project?",
    },
    {
        "type": "input",
        "name": "description",
        "message": "Describe the project:"
    },
    {
        "type": "input",
        "name": "installation",
        "message": "How is the project installed?"
    },
    {
        "type": "input",
        "name": "usage",
        "message": "Provide instructions for the project:"
    },
    {
        "type": "list",
        "name": "licence",
        "message": "Select a licence.",
        "choices": ["MIT",
                "Apache 2.0"
        ]
    },
    {
        "type": "input",
        "name": "contributors",
        "message": "List the contributors to the project:"
    },
    {
        "type": "input",
        "name": "tests",
        "message": "Enter testing information",
        filter(testAnswer) {
            if(testAnswer==="") {
                return false;
            }
            return testAnswer;
        }
    },
    {
        "type": "input",
        "name": "githubUser",
        "message": "Please enter your Github username:"
    },
    {
        "type": "input",
        "name": "repository",
        "message": "Please enter the name of the repository:"
    },
    {
        "type": "confirm",
        "name": "hasWebpage",
        "message": "Does the repo have a github webpage?"
    },
    {
        "type": "input",
        "name": "email",
        "message": "Enter your email address",
        validate(emailAddr) {
            const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailValidator.test(emailAddr)) {
                return "please provide a valid address.";
            }
            return true;
        }
    }
];

let {title, description, installation, usage, licence, contributors, tests, githubUser, repository, hasWebpage, email} = await inquirer
    .prompt(questions);

let {licenceWords, licenceBadge} = licenceSpiel(licence, contributors);
let {user, myRepo, myEmail, myWebpage} = githubLinks(githubUser, repository, email, hasWebpage);

function licenceSpiel(licenceChoice, writers) {
    let specificLicence;
    let badge;
    let thisYear = new Date().getYear()+1900; // js years start 1900
    switch (licenceChoice) {
        case "MIT":

            specificLicence = `Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
            
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
            
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
            
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
            
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`.replace("<year>", thisYear).replace("<copyright holders>", writers);
            badge = '![Bower](https://img.shields.io/bower/l/MI?style=for-the-badge)';
            return {licenceWords: specificLicence, licencebadge: badge};
            break;

        case "Apache 2.0":
            specificLicence = `Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
            
http://www.apache.org/licenses/LICENSE-2.0
            
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`.replace("[yyyy]", thisYear).replace("[name of copyright owner]", writers);
            badge = '![Hex.pm](https://img.shields.io/hexpm/l/apa?style=for-the-badge)';
            return {licenceWords: specificLicence, licenceBadge: badge};
        default:
            break;
    }
}

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