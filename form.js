let formErrors = [];

const email = document.getElementById("mail");
email.addEventListener("input",function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("This is not an email address!");

    } else {
        email.setCustomValidity("");
    }
});


    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    let nameRegex = /^[a-zA-Z]+$/;
    
    
    const comments = document.getElementById('comments');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const commentsError = document.getElementById('commentsError');
    const infoOutput = document.getElementById('infoOutput');

 

    comments.addEventListener("input",function (event) {

        if (comments.validity.tooLong) {
            comments.setCustomValidity('Comments should not exceed 100 characters.');
            formErrors.push({ field: 'comments', message: 'Comments should not exceed 100 characters' });

        } else {
            comments.setCustomValidity('');
        }
    })
            
    function showErrorMessage(element) {
        element.classList.add('fade-out');
        element.textContent="Comments should only contain alphanumeric characters and spaces.";

        setTimeout(() => {
            element.classList.remove('fade-out');
            element.textContent='';
        }, 2000);
        
    }
    function showErrorMessageName(element) {
        element.classList.add('fade-out');
        element.textContent='Name should only contain letters and spaces.';

        setTimeout(() => {
            element.classList.remove('fade-out');
            element.textContent='';
        }, 2000);
    }
    
    comments.addEventListener("keydown",event => {
        updateCharacterCount(comments)

        var nonTypicalCharactersRegex = /[^a-zA-Z0-9\s]/;
        if (nonTypicalCharactersRegex.test(event.key)) {
            event.preventDefault();
            comments.setCustomValidity('Comments should only contain alphanumeric characters and spaces.');

            comments.classList.add('flash-error');
            setTimeout(() => {
                comments.classList.remove('flash-error');
            }, 500);
            
            showErrorMessage(commentsError);
            formErrors.push({ field: 'comments', message: 'Comments should only contain alphanumeric characters and spaces' });

        } else {
            comments.setCustomValidity('');
        }
    });

    nameInput.addEventListener("keydown",event => {

        var nonTypicalCharactersRegex = /[^a-zA-Z\s]/;
        if (nonTypicalCharactersRegex.test(event.key)) {
            event.preventDefault();
            nameInput.setCustomValidity('Name should only contain letters and spaces.');
            formErrors.push({ field: 'name', message: 'Name should only contain letters' });

            nameInput.classList.add('flash-error');
            setTimeout(() => {
                nameInput.classList.remove('flash-error');
            }, 500);
            showErrorMessageName(nameError);

        } else {
            nameInput.setCustomValidity('');
        }
    });

    function updateCharacterCount(textarea) {
        var maxCharacters = 100;
        var remainingCharacters = maxCharacters - textarea.value.length;
        var infoOutput = document.getElementById('infoOutput');

        infoOutput.textContent = remainingCharacters + ' characters remaining';

        // Change style based on the remaining characters
        if (remainingCharacters>30){
            infoOutput.style.color = 'green';

        }
        if (remainingCharacters <= 30) {
            infoOutput.style.color = 'yellow';
        }
        if (remainingCharacters <= 20) {
            infoOutput.style.color = 'orange'; 
        }

        if (remainingCharacters <= 10) {
            infoOutput.style.color = 'red';
        }
    }
    
    function submitForm(){
        console.log(formErrors);

        let formErrorsJson = JSON.stringify(formErrors);
        let formErrorsInput = document.createElement('input');
        formErrorsInput.type = 'hidden';
        formErrorsInput.name = 'form-errors';
        formErrorsInput.value = formErrorsJson;
        form.appendChild(formErrorsInput);
    }

    
    
    

