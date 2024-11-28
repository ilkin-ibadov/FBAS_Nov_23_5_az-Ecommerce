$('#login-form').submit(function (event) {
        event.preventDefault();
    
        const email = $('#email').val();
        const password = $('#password').val();
    
        const loginData = {
            email: email,
            password: password
        };
    
        $.ajax({
            url: 'http://localhost:3000/api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
        });
    });
    