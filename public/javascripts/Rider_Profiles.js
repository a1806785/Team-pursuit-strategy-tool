window.onload = function () {
    var tfrow = document.getElementById('tfhover').rows.length;
    var tbRow = [];
    for (var i = 1; i < tfrow; i++) {
        tbRow[i] = document.getElementById('tfhover').rows[i];
        tbRow[i].onmouseover = function () {
            this.style.backgroundColor = '#ffffff';
        };
        tbRow[i].onmouseout = function () {
            this.style.backgroundColor = '#d4e3e5';
        };
    }
};

var rider_number = 10;

var app = new Vue({
    el: '#app',
    data: {
        message: '',
        temp: [],
    },
    methods: {
        link_to_advanced_settings: function () {
            window.location.href = "../Advance_Settings.html";
        },
        calculate: function () {
            window.location.href = "../output.html";
        },
        link_rider_profiles: function () {
            window.location.href = "../Rider_Profiles.html";
        },
        add_new_rider: function () {
            rider_number = rider_number + 1;
            let new_rider = `
            <tr>
                <td>Rider ${rider_number}</td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
                <td contentEditable="true"></td>
            </tr>`;
            let add_row = document.getElementById("tfhover");
            add_row.innerHTML += new_rider;


            // send the number of rider
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let send_ = {send_info: rider_number};
                }
            };

            xhttp.open("POST", "/rider_number");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(send_));
        },
        return_homepage: function () {
            window.location.href = "../HomePage.html";
        },
    },
});