// Elements (inputs)
import { inputFullName, inputUserName, inputAge, inputGender, inputMoney, inputWorkExp, inputHealth, textGender, btnMan, btnWoman, modalForm, modalGender } from './elements.js';

class Person {
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

    // // Método para cargar datos desde el almacenamiento local
    // static loadFromLocalStorage() {
    //     const data = JSON.parse(localStorage.getItem('Person'));
    //     if (data) {
    //         return new Person(data.fullName, data.userName, data.gender, data.age, data.money, data.workExp, data.health, data.married);
    //     } else {
    //         return null;
    //     }
    // }
}

class Functions {
    constructor(person) {
        this.person = person;
    }

    checkAll() {
        const checkFullName = () => this.person.fullName;
        checkFullName();

        const checkAge = () => {
            switch (true) {
                case this.person.age >= 50:
                    return 'You are an adult, a old.';
                case this.person.age >= 30 && this.person.age < 50:
                    return "You're in your prime, your knees already hurt.";
                case this.person.age >= 18 && this.person.age < 30:
                    return 'You are an adult.';
                case this.person.age >= 13 && this.person.age < 18:
                    return 'You are a teenager.';
                default:
                    return "Don't you have an age? We will send you to write your age";
            }
        }
        checkAge();

        const checkMoney = () => this.person.money <= 0 ?
            "You don't have money, sorry. Try again later." :
            `Great! You do have money, your credit is: ${this.person.money} USD.`;
        checkMoney();

        const checkHealth = () => {
            let healthStatus = this.person.health < 65 ? 'You are not well,' :
                'You are doing great! Keep it.';
            let healthStatus2 = this.person.health < 65 ? 'should go to the hospital.' : '';

            return this.person.health === undefined ? 'No health data provided.' :
                healthStatus + " " + healthStatus2;
        }
        checkHealth();

        const checkStatusMarital = () => this.person.married === 'Yes' ? 'You have married.' : 'You are single.';
        checkStatusMarital();
    }
}

const btnSubmitForm = document.getElementById('btnSubmitForm');
btnSubmitForm.addEventListener('click', function (e) {
    e.preventDefault();
    
    setTimeout(() => {
        btnSubmitForm.textContent = 'Receive and save datas to local storage...';
        const person = new Person();
        setTimeout(() => {
            person.getValues();
            person.saveToLocalStorage()
        }, 1000);
        setTimeout(() => {
            const functions = new Functions(person);
            functions.checkAll();
            window.location.href = '/src/pages/home/game.html';
        }, 2500);
    }, 500)
});