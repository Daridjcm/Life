import { modalForm, modalGender, textGender, btnMan, btnWoman, inputGender } from './elements.js';
import { PersonData, Functions } from './life.js';

const buttonClicked = true;
btnNext.style.display = 'none';
function nextBtn(checkBool) {    
    if (checkBool === !buttonClicked) {
        const btnNext = document.getElementById('btnNext');
        const div = document.getElementById('modalGender');
        div.appendChild(btnNext);

        buttonClicked;
        btnNext.style.display = 'block';
        if(buttonClicked === true) {
            btnNext.addEventListener('click', () => {
                modalForm.style.display = 'block';
                modalGender.style.display = 'none';
            });
        }
    } else {
        alert('Next button cannot be created because a button has already been clicked.');
    }
}

const verifyInfo = () => {
    if(PersonData && Functions === true) {
        modalForm.style.display = 'none';
        modalGender.style.display = 'none';
    } else {
        modalForm.style.display = 'block';
        modalGender.style.display = 'none';
        return false;
    }
}

btnMan.addEventListener('click', function() {
    console.log('Clicked the button of gender: Man.');
    textGender.innerText = 'Congratulations! You have chosen to be a man.';
    inputGender.value = 'Man';
    nextBtn(!buttonClicked);
});

btnWoman.addEventListener('click', function() {
    console.log('Clicked the button of gender: Woman.');
    textGender.innerText = 'Congratulations! You have chosen to be a woman.';
    inputGender.value = 'Woman';
    nextBtn(!buttonClicked);
});

document.addEventListener('DOMContentLoaded', function() {
    const btnSubmitForm = document.getElementById('btnSubmitForm');
    btnSubmitForm.addEventListener('click', function(e) {
        e.preventDefault();

        // Now you can use createLife and createlifeFunctions as needed
        const saveInfo = () => {
            const instanceObj = () => {
                setTimeout(() => {
                    console.log('A life is being created...');
                    let createLife = new PersonData();
                    console.log(createLife);
                    createLife.getValues();
                }, 2000);
                
                setTimeout(() => {
                    console.log('Getting functions to survive...');
                    let lifeFunctions = new Functions();
                    console.log(lifeFunctions);
                    lifeFunctions.getValues();
                    lifeFunctions.saveToLocalStorage(); // Save datas of form
                }, 5000);

                setTimeout(() => {
                    btnSubmitForm.textContent = 'Submit'
                }, 7000);
            }       
            return instanceObj() === true ? alert('Refresh the webpage, please.') : btnSubmitForm.textContent = 'Loading...'; // Change modalLoading to the button loader
        }
        saveInfo();
        verifyInfo()
    });
});