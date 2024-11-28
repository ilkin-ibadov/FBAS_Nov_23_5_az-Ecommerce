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
                    if (response.okay === true) {
                        window.location.href = 'Login.html';
                    } else {
                        $("#error-message").removeClass("text-green-500").addClass("text-green-500").text(response.message || "Something went wrong, please try again.");
                    }
                },
                error: function(xhr, status, error) {
                    $("#error-message").removeClass("text-green-500").addClass("text-red-500").text("There was an error with the request: " + error);
                }
            });
        });
    });
    