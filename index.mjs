import inquirer from 'inquirer';
//import fs from "fs";
import fs from "fs/promises"

// let questionsText = await fs.readFile('./assets/questions.txt', { encoding: "utf8", flag: "r" });
// //let questionsArray = removeWhiteSpace(questionsText);

// let questionsArray =  JSON.parse(removeWhiteSpace(questionsText));
// console.log(questionsArray);

let {title, description, installation, usage, licence, contributors, tests, questions} = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: "What's the title of the project?",
        },
        {
            type: 'input',
            name: 'description',
            message: "Describe the project:",
        },
        {
            type: 'input',
            name: 'installation',
            message: "How is the project installed?",
        },
        {
            type: 'input',
            name: 'usage',
            message: "Provide instructions for the project:",
        },
        {
            type: 'list',
            name: 'licence',
            message: "Select a licence.",
            choices: ["MIT",
                    "Apache 2.0",
            ]
        },
        {
            type: 'input',
            name: 'contributors',
            message: "List the contributors to the Meproject:",
        },
        {
            type: 'input',
            name: 'tests',
            message: "Enter testing information",
        },
        {
            type: 'input',
            name: 'questions',
            message: "GitHub link:",
        },
    ]);

let {licenceWords, licenceBadge} = licenceSpiel(licence, contributors);


function licenceSpiel(licenceChoice, writers) {
    let specificLicence;
    let licenceBadge;
    let thisYear = new Date().getYear()+1900; // js years start 1900 - software written before nbg
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
            licenceBadge = '![Hex.pm](https://img.shields.io/hexpm/l/apa?style=for-the-badge)';
            return {licenceWords: specificLicence, licencebBdge: badge};
        default:
            break;
    }
}

  let readmeDocument =  `
# Project - ${title}

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

${questions}
    `

    await fs.writeFile("README.md", readmeDocument)

function removeWhiteSpace(str) {
    return str.replace(/[\s\r\n]+/g, "");
}