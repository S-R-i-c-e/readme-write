/*
 * questions.js
 * questions is the array required for the inquirer prompt for readme-writer index.mjs
 */

export default function questions () { 
    return [{
        "type": "input",
        "name": "title",
        "message": "What's the title of the project?",
    },
    {
        "type": "editor",
        "name": "description",
        "message": "Describe the project:"
    },
    {
        "type": "editor",
        "name": "installation",
        "message": "How is the project installed?"
    },
    {
        "type": "editor",
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
}