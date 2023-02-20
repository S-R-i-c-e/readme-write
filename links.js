/*
 * link.js
 * links function constructs contact links based on user inputfor readme-writer index.mjs
 */

export default function links(userName, repos, emailAddress, webpageExists) {
    let linkGit = `#### GitHub: [@${userName}](https://api.github.com/users/${userName})`;
    let linkEmail = `#### [email](${emailAddress})`;
    let linkRepo = `#### [repo](https://github.com/${userName}/${repos})`;
    let linkWebpage = '';
    if (webpageExists) {
        linkWebpage = `#### [webpage](https://${userName}.github.io/${repos}/)`;
    }
    return {user: linkGit, myEmail: linkEmail, myRepo: linkRepo, myWebpage: linkWebpage};
}