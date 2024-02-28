// Elements (inputs)
import { inputFullName, inputUserName, inputAge, inputGender, inputMoney, inputWorkExp, inputHealth, textGender, btnMan, btnWoman } from './elements.js';

export class PersonData {
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
        const updateMarriedStatus = (param) => {
            let IDMarriedTrue = document.getElementById("mTrue");
            let IDMarriedFalse = document.getElementById("mFalse");
            
            if(IDMarriedTrue.checked === true) {
                return 'Yes';
            } else if(IDMarriedFalse.checked === true) {
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
        this.married = updateMarriedStatus(this.married);    
    }

    // Método para guardar los datos en el almacenamiento local
    saveToLocalStorage() {
        localStorage.setItem('personData', JSON.stringify(this));
    }
    
    // Método para cargar datos desde el almacenamiento local
    static loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('personData'));
        if (data) {
            return new PersonData(data.fullName, data.userName, data.gender, data.age, data.money, data.workExp, data.health, data.married);
        } else {
            return null;
        }
    }
}

export class Functions extends PersonData {
    constructor() {
        super();
        super.getValues();
    }

    checkAll() {
        const checkFullName = () => this.fullName;
        checkFullName();

        const checkAge = () => {
            switch (true) {
                case this.age >= 50:
                    return 'You are an adult, a old.';
                case this.age >= 30 && this.age < 50:
                    return "You're in your prime, your knees already hurt.";
                case this.age >= 18 && this.age < 30:
                    return 'You are an adult.';
                case this.age >= 13 && this.age < 18:
                    return 'You are a teenager.';
                default:
                    return "Don't you have an age? We will send you to write your age";
            }
        }
        checkAge();
        
        const checkMoney = () => this.money <= 0 ?
            "You don't have money, sorry. Try again later." :
            `Great! You do have money, your credit is: ${this.money} USD.`;
        checkMoney();    

        const checkHealth = () => {
            let healthStatus = this.health < 65 ? 'You are not well,' : 
            'You are doing great! Keep it.';
            let healthStatus2 = this.health < 65 ? 'should go to the hospital.' : '';

            return this.health === undefined ? 'No health data provided.' :
            healthStatus + " " + healthStatus2;
        }
        checkHealth();

        const checkStatusMarital = () => this.married === 'Yes' ? 'You have married.' : 'You are single.';
        checkStatusMarital();
    }
}
