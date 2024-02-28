import { modalForm, modalGender, textGender, btnMan, btnWoman, inputGender } from './elements.js';

const buttonClicked = true;
btnNext.style.display = 'none';
function nextBtn(checkBool) {
    if (checkBool === !buttonClicked) {
        const btnNext = document.getElementById('btnNext');
        const div = document.getElementById('modalGender');
        div.appendChild(btnNext);

        buttonClicked;
        btnNext.style.display = 'block';
        if (buttonClicked === true) {
            btnNext.addEventListener('click', () => {
                modalForm.style.display = 'block';
                modalGender.style.display = 'none';
            });
        }
    } else {
        alert('Next button cannot be created because a button has already been clicked.');
    }
}

btnMan.addEventListener('click', function () {
    console.log('Clicked the button of gender: Man.');
    textGender.innerText = 'Congratulations! You have chosen to be a man.';
    inputGender.value = 'Man';
    nextBtn(!buttonClicked);
});

btnWoman.addEventListener('click', function () {
    console.log('Clicked the button of gender: Woman.');
    textGender.innerText = 'Congratulations! You have chosen to be a woman.';
    inputGender.value = 'Woman';
    nextBtn(!buttonClicked);
});
