import inquirer from 'inquirer';
import fs from 'fs';

// let questions = [
//     {
//         type: 'inpout',
//         name: 'userName',
//         message: 'What is your name?',
//     },
//     {
//         type: 'input',
//         name: 'languages',
//         message: 'What languages do you know?',
//     },
//     {
//         type: 'input',
//         name: 'preferred',
//         message: 'What is your preferred method of communication?',
//     },
// ]
let questionsTxt;
try {
    questionsTxt = fs.readFileSync('objTest.txt', { encoding: 'utf8' });
} catch (err) {
    // An error occurred
    console.error(err);
}

let questions = JSON.parse(questionsTxt);

inquirer
    .prompt(questions)
    .then((answers) => {
        fs.writeFile('answers.txt', JSON.stringify(answers), (err) =>
            err ? console.error(err) : markUp(answers)
        );
    });


function markUp(readmeAnswers) {
    console.log(typeof readmeAnswers);

//    let preMark = JSON.parse(readmeAnswers.txt);
    // let marked = readmeAnswers.map(obj => obj.markup = "cheese");
    // console.log(marked);
}
