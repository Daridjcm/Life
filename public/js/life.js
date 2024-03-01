// Elements (inputs)
import { inputFullName, inputUserName, inputAge, inputGender, inputMoney, inputWorkExp, inputHealth, textGender, btnMan, btnWoman, modalForm, modalGender } from './elements.js';

export class Person {
    constructor(fullName, userName, gender, age, money, workExp, health, married) {
        this.fullName = fullName;
        this.userName = userName;
        this.gender = gender;
        this.age = age;
        this.money = money;
        this.workExp = workExp;
        this.health = health;
        this.married = married;
    }

    getValues() {
        const updateMarriedStatus = () => {
            let IDMarriedTrue = document.getElementById("mTrue");
            let IDMarriedFalse = document.getElementById("mFalse");

            if (IDMarriedTrue.checked === true) {
                return 'Yes';
            } else if (IDMarriedFalse.checked === true) {
                return 'No';
            } else {
                return 'Not specified.';
            }
        }

        const checkGender = (param) => inputGender.value === 'Man' ? this.gender = 'Man' : inputGender.value === 'Woman' ? this.gender = 'Woman' : 'Not specified.';

        this.fullName = inputFullName.value;
        this.userName = inputUserName.value;
        this.age = Number(inputAge.value);
        this.gender = checkGender(btnMan, btnWoman);
        this.money = Number(inputMoney.value);
        this.workExp = Number(inputWorkExp.value);
        this.health = Number(inputHealth.value);
        this.married = updateMarriedStatus();
    }

    // Save object in the local storage
    saveToLocalStorage() {
        localStorage.setItem('User', JSON.stringify(this));
    }

    // Load datas from local storage
    loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('User'));
        console.log(data);
        if (data) {
            return new Person(data.fullName, data.userName, data.gender, data.age, data.money, data.workExp, data.health, data.married);
        } else {
            return null;
        }
    }
}

export const person = new Person();
export const loadInfo = () => {
    window.location.href = '/src/pages/home/game.html';
    person.loadFromLocalStorage();
}

const btnSubmitForm = document.getElementById('btnSubmitForm');
btnSubmitForm.addEventListener('click', function (e) {
    e.preventDefault();
    
    setTimeout(() => {
        btnSubmitForm.textContent = 'Receive and save datas to local storage...';
        setTimeout(() => {
            person.getValues();
            person.saveToLocalStorage()
            loadInfo();
        }, 1000);
    }, 500);
});