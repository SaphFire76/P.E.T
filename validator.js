

//form validation script
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    //clear all previous error messages
    document.querySelectorAll('.error').forEach(element => element.textContent = '');

    let isValid = true;

    //first name validation
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First name is required.';
        isValid = false;
    }

    //last name validation
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Last name is required.';
        isValid = false;
    }

    //email validation
    const email = document.getElementById('email').value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required.';
        isValid = false;
    }

    //password validation
    const password = document.getElementById('password').value.trim();
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long, contain at least one number, and one special character.';
        isValid = false;
    }

    

    //terms and conditions validation
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the terms.';
        isValid = false;
    }

    //if all validations pass then form is submitted
    if (isValid) {
        //alert('Form submitted successfully!');
        this.submit();
    }
});

