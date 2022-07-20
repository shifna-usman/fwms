<html>

<head>
    <title>Login</title>
    <link rel="stylesheet" href="css/user.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        $(document).ready(function(){

            $("#login").click(function(e){
                e.preventDefault();
                phone = $("#phone").val().trim();
                password = $("#password").val().trim();
                if(phone == "" || password == ""){
                    alert("Please fill all required fields");
                    return false;
                }

                data = {phone : phone,password : password};

                $.ajax({
                    url : 'api/login.php',
                    method : "POST",
                    data : data
                }).done(function(data){
                    data = JSON.parse(data);
                    if(data.result){
                        location.href = 'dashboard.html'
                    }
                    else{
                        alert("Phone Number/Password Incorrect. Please try again")
                    }
                }).fail(function(){
                    alert("Operation failed. Please try again");
                })
            })
        })
    </script>
   
</head>

<div class="login-page">
    <div class="form">
        <div class="error-message">
        </div>
        <form class="login-form" style="margin-top: 10px;">
            <input id="phone" class="error" type="text" placeholder="Phone Number" />
            <input id="password" type="password" placeholder="Password" />
            <button id="login">Login</button>
            <p class="message">Not registered? <a href="signup.html">Create an account</a></p>
        </form>
    </div>
</div>
</body>

</html>