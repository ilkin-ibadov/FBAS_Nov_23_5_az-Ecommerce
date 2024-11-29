$(document).ready(function() {
    $("button[type='submit']").click(function(e) {
        var firstname = $("#name").val();
        var lastname = $("#surname").val();
        var email = $("#email").val();
        var password = $("#password").val();

        var data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };

        $.ajax({
            url: 'http://localhost:3000/api/auth/register',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log(response);

                if (response.message) {
                    console.log(response.message);

                    setTimeout(function () {
                        window.location.href = '/Login.html';
                    }, 2000);

                    $("#error-message").removeClass("text-red-500").addClass("text-green-500").text(response.message);
                } else {
                    $("#error-message").removeClass("text-green-500").addClass("text-red-500").text("Something went wrong, please try again.");
                }
            },
            error: function(xhr, status, error) {
                $("#error-message").removeClass("text-green-500").addClass("text-red-500").text("There was an error with the request: " + error);
            }
        });
    });
});
