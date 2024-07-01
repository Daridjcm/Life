// Make function for go to work
let health = document.getElementById('health'); 
let money = document.getElementById('money');
let btnGoWork = document.getElementById('btnWork');

let eventBtnWork = btnGoWork.addEventListener('click', function() {
    let money = Math.floor(Math.random() * 100) + 1;
    let health = Math.floor(Math.random() * 100) + 1;
    money.innerHTML = money;
    health.innerHTML = health;
})

function goToWork(e) {
    e = eventBtnWork;
};
goToWork(eventBtnWork)

// Make function for go to bank
function goToBank(params) {
    
};

// Make function for marry
function goMarry(params) {
    
};


// let iconGenderDiv = document.getElementsByClassName('iconGender');

// let iconWoman = document.createElement('span');
// iconWoman.classList.add(["icon-[streamline--woman-symbol-solid]"], ["text-pink-500"]);

// let iconMan = document.createElement('span');
// iconMan.classList.add(["icon-[streamline--man-symbol-solid]"], ["text-blue-500"]);

// const verifyGender = () => {
//     this.gender === 'Woman' ? iconGenderDiv.appendChild(iconWoman) : this.gender === 'Man' ? iconGenderDiv.appendChild(iconMan) : alert('Gender not specified.');
// }
// verifyGender();