import { person, loadInfo } from './life.js';

let iconGenderDiv = document.getElementsByClassName('iconGender');

let iconWoman = document.createElement('span');
iconWoman.classList.add(["icon-[streamline--woman-symbol-solid]"],["text-pink-500"]);

let iconMan = document.createElement('span');
iconMan.classList.add(["icon-[streamline--man-symbol-solid]"], ["text-blue-500"]);

const verifyGender = () => {
    let User = localStorage.getItem('User');
    User.gender === 'Woman' ? iconGenderDiv.appendChild(iconWoman) : User.gender === 'Man' ? iconGenderDiv.appendChild(iconMan) : alert('Gender not specified.');
}
verifyGender();