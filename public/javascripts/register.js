var app = new Vue({
    el: '#app',
    data: {
        message: '',
        temp: [],
    },
    methods: {
        // register
        register: function () {
            let user = {
                email: document.getElementsByName('email')[0].value,
                username: document.getElementsByName('username')[0].value,
                password: document.getElementsByName('password')[0].value
            };

            if (user.username === '') {
                alert("Please enter your Username");
                return;
            } else if (user.email === '') {
                alert("Please enter your Email");
                return;
            } else if (user.password === '') {
                alert("Please enter your Password");
                return;
            }

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    window.location.href = "../HomePage.html";
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("The Username already exists, please change your Username.");
                }
            };

            xhttp.open("POST", "/users/register");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(user));
        },
    },
});