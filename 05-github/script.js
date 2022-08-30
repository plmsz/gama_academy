import { TOKEN } from "./const.js";
const inputUser = document.querySelector("#username");
const inputRepo = document.querySelector("#repo");
const alertUser = document.getElementById("alertUser");
const alertRepo = document.getElementById("alertRepo");
const containerRepo = document.querySelector("#container-repo");

let username = '';
let data = [];

async function getUserRepos(userName) {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };
    const response = await fetch(`https://api.github.com/users/${userName}/repos?page=1&per_page=100`, options);
    data = await response.json();
    alertUser.textContent = '';
    if (data.message) {
        containerRepo.innerHTML = null;
        alertUser.textContent = 'User not found';
        inputUser.setAttribute('aria-invalid', true);
        inputUser.value = '';
        inputUser.focus();
        return;
    }
    containerRepo.innerHTML = data.map(repo => `<li>${repo.name}</li>`).join('');
}

inputRepo.addEventListener("keyup", (e) => {
    inputRepo.removeAttribute('aria-invalid', true);
    alertRepo.textContent = '';
    const value = e.target.value.toLowerCase();
    console.log(value);
    const filteredData = data.filter(repo => repo.name.toLowerCase().includes(value));
    
    if (filteredData.length > 0) {
        containerRepo.innerHTML = filteredData.map(repo => `<li>${repo.name}</li>`).join('');
    } else {
        if (value) {
            alertRepo.textContent = (`No repo with the name ${value} was found`);
            containerRepo.innerHTML = null;
            inputRepo.setAttribute('aria-invalid', true);
        }
    }
});

inputUser.addEventListener("blur", (e) => {
    inputUser.removeAttribute('aria-invalid', true);
    containerRepo.innerHTML = null;
    const value = e.target.value;
    if (value.length > 0) {
        username = value;
    }
    getUserRepos(username);
});