$(document).ready(function () {
    $('button[type="button"]').click(function (e) {
        e.preventDefault();
        
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        $('#error-message').text('');

        if (!email || !password) {
            $('#error-message').text('Email and password fields cannot be empty.').css('color', 'red');
            return;
        }

        $.ajax({
            url: 'http://localhost:3000/api/auth/login',
            type: 'POST', 
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ email: email, password: password }),
            success: function (response) {
                console.log(response); 
                if (response.accessToken && response.refreshToken) {
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    
                    $('#error-message').text('Login successful!').css('color', 'green');
                } else {
                    $('#error-message').text(response.message || 'Login failed!').css('color', 'red');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error details:', error);
                $('#error-message').text('An error occurred: ' + error).css('color', 'red');
            },
        });
    });
});
