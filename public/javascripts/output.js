var app = new Vue({
    el: '#app',
    data: {
        message: '',
        temp: [],
    },
    methods: {
        return_homepage: function () {
            window.location.href = "../HomePage.html";
        }
    },
});