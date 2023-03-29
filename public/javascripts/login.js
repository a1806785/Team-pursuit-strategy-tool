var app = new Vue({
    el: '#app',
    data: {
        message: '',
        temp: [],
    },
    methods: {
        // Log In
        login: function () {
            let user = {
                username: document.getElementsByName("username")[0].value,
                password: document.getElementsByName("password")[0].value
            };

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let receive = this.responseText;
                    if (receive === 'normal') {
                        window.location.href = "../HomePage.html";
                    } else {
                        window.location.href = "../HomePage.html";
                    }
                } else if (this.readyState == 4 && this.status >= 400) {
                    alert("Log in fail");
                }
            };

            xhttp.open("POST", "/users/login");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(user));
        },

        register: function () {
            window.location.href = "../Register.html";
        }
    },
});