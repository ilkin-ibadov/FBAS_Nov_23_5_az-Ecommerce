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
            dataType: 'json',
            data: JSON.stringify(loginData),
            success: function (data) {
                if (data.success) {
                    window.location.href = "/dashboard";
                } else {
                    $('#error-message').text(data.message || 'Login failed.');
                }
            },
            error: function () {
                $('#error-message').text('An error has occurred. Please try again.');
            }
        });
    });
    