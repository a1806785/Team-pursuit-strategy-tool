

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


let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let num = JSON.parse(this.responseText);
        console.log(num);

        let temp = ``;
        for (let i = 0; i < num; i++) {
            temp += `<option value="Rider_${i+1}">Rider ${i+1}</option>`;
        }
        let select_value = `<select  class="button" >` + temp + `</select>`;

        let select_boxes = document.getElementById("select_rider");
        for (let i = 0; i < 5; i++) {
            select_boxes.innerHTML += select_value;
        }

    }
};

xhttp.open("POST", "/send_rider_number");
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();

// var num = window.opener.rider_number;
// let temp = ``;
// for (let i = 0; i < num; i++) {
//     temp += `<option value="Rider_${i+1}">Rider ${i+1}</option>`;
// }
// let select_value = `<select  class="button" >` + temp + `</select>`;

// let select_boxes = document.getElementById("select_rider");
// for (let i = 0; i < 5; i++) {
//     select_boxes.innerHTML += select_value;
// }


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
        link_to_output: function () {
            window.location.href = "../output.html";
        }
        // show_select_boxes: function () {
        //     let xhttp = new XMLHttpRequest();

        //     xhttp.onreadystatechange = function() {
        //         if (this.readyState == 4 && this.status == 200) {
        //             let num = this.responseText;

        //             let temp = ``;
        //             for (let i = 0; i < num; i++) {
        //                 temp += `<option value="Rider ${i+1}">Volvo</option>`
        //             }
        //             let select_value = `<select>` + temp + `</select>`;

        //             let select_boxes = document.getElementById("select_rider");
        //             for (let i = 0; i < 5; i++) {
        //                 select_boxes.innerHTML += select_value;
        //             }

        //         }
        //     };

        //     xhttp.open("GET", "/send_rider_number", true);

        //     xhttp.send();
        // }
    },
});


// excel implemntation
// reference to the implementation of Group CYCIN 4
function sum(duration) {
    var add = 0;
    for (var i = 0; i < duration.length; i++) {
        add += duration[i];
    }

    if(add != 16){
        console.log("Check turn duration:" + add);
    }

    return add;
}

function laponepm(t){
    // Male lap one power profile


    var laponepm =-0.00000209 * Math.pow( t , 6) + 0.00046936 * Math.pow( t, 5) - 0.04095257 * Math.pow( t, 4) + 1.75290819 * Math.pow( t, 3) - 37.78916029 * Math.pow( t, 2) + 353.56482552 * t + 0.56673857;
    //Todo: laponepm = -0.00000209 * t ^ 6 + 0.00046936 * t ^ 5 - 0.04095257 * t ^ 4 + 1.75290819 * t ^ 3 - 37.78916029 * t ^ 2 + 353.56482552 * t + 0.56673857
    return laponepm;
}

function laponepf(t){
    // female lap one power profile
    //var laponepf = 0.00001005 * t ^ 6 - 0.00094366 * t ^ 5 + 0.0219983 * t ^ 4 + 0.38272972 * t ^ 3 - 21.91542658 * t ^ 2 + 254.90139424 * t - 5;
    var laponepf = 0.00001005 * Math.pow(t, 6) - 0.00094366 * Math.pow(t, 5) + 0.0219983 *  Math.pow(t, 4) + 0.38272972 * Math.pow(t, 3) - 21.91542658 * Math.pow(t, 2) + 254.90139424 * t - 5;

    return laponepf;
}

function excel(){
    // Track_geometry_lookup sheet - done

    // Ramanujan perimeter of ellipse: P ≈ π [ 3 (a + b) - √[(3a + b) (a + 3b) ]]

    //Dist between straights, r(=b), dist bends@r, %bend (in decimal), a=r+dist from apex, Ram.Ellipse perimeter black, Ram.Ellipse perimeter travelled, extra distance travelled, multiplier
    const dist_betwwn_straights= [45, 48.6, 42.5];

    const Adelaide = [dist_betwwn_straights[0], dist_betwwn_straights[0]/2, Math.PI*dist_betwwn_straights[0], 250-Math.PI*dist_betwwn_straights[0],Math.PI*dist_betwwn_straights[0]/250, dist_betwwn_straights[0]/2+0.4,
        Math.PI*(3*(dist_betwwn_straights[0])-Math.sqrt((3*dist_betwwn_straights[0]/2+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+3*dist_betwwn_straights[0]/2))),
        Math.PI*(3*(dist_betwwn_straights[0]/2+0.4+dist_betwwn_straights[0]/2)-Math.sqrt((3*(dist_betwwn_straights[0]/2+0.4)+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+0.4+3*dist_betwwn_straights[0]/2))),
        Math.PI*(3*(dist_betwwn_straights[0]/2+0.4+dist_betwwn_straights[0]/2)-Math.sqrt((3*(dist_betwwn_straights[0]/2+0.4)+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+0.4+3*dist_betwwn_straights[0]/2)))-Math.PI*(3*(dist_betwwn_straights[0])-Math.sqrt((3*dist_betwwn_straights[0]/2+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+3*dist_betwwn_straights[0]/2))),
        250/(250+Math.PI*(3*(dist_betwwn_straights[0]/2+0.4+dist_betwwn_straights[0]/2)-Math.sqrt((3*(dist_betwwn_straights[0]/2+0.4)+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+0.4+3*dist_betwwn_straights[0]/2)))
        -Math.PI*(3*(dist_betwwn_straights[0])-Math.sqrt((3*dist_betwwn_straights[0]/2+dist_betwwn_straights[0]/2)*(dist_betwwn_straights[0]/2+3*dist_betwwn_straights[0]/2))))
    ];
    const Brisbane = [dist_betwwn_straights[1], dist_betwwn_straights[1]/2, Math.PI*dist_betwwn_straights[1], Math.PI*dist_betwwn_straights[1], Math.PI*dist_betwwn_straights[1]/250, dist_betwwn_straights[1]/2+0.4,
        Math.PI*(3*(dist_betwwn_straights[1])-Math.sqrt((3*dist_betwwn_straights[1]/2+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+3*dist_betwwn_straights[1]/2))),
        Math.PI*(3*(dist_betwwn_straights[1]/2+0.4+dist_betwwn_straights[1]/2)-Math.sqrt((3*(dist_betwwn_straights[1]/2+0.4)+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+0.4+3*dist_betwwn_straights[1]/2))),
        Math.PI*(3*(dist_betwwn_straights[1]/2+0.4+dist_betwwn_straights[1]/2)-Math.sqrt((3*(dist_betwwn_straights[1]/2+0.4)+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+0.4+3*dist_betwwn_straights[1]/2)))-Math.PI*(3*(dist_betwwn_straights[1])-Math.sqrt((3*dist_betwwn_straights[1]/2+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+3*dist_betwwn_straights[1]/2))),
        250/(250+Math.PI*(3*(dist_betwwn_straights[1]/2+0.4+dist_betwwn_straights[1]/2)-Math.sqrt((3*(dist_betwwn_straights[1]/2+0.4)+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+0.4+3*dist_betwwn_straights[1]/2)))
        -Math.PI*(3*(dist_betwwn_straights[1])-Math.sqrt((3*dist_betwwn_straights[1]/2+dist_betwwn_straights[1]/2)*(dist_betwwn_straights[1]/2+3*dist_betwwn_straights[1]/2))))
    ];
    const Tokyo = [dist_betwwn_straights[2], dist_betwwn_straights[2]/2, Math.PI*dist_betwwn_straights[2], Math.PI*dist_betwwn_straights[2], Math.PI*dist_betwwn_straights[2]/250, dist_betwwn_straights[2]/2+0.4,
        Math.PI*(3*(dist_betwwn_straights[2])-Math.sqrt((3*dist_betwwn_straights[2]/2+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+3*dist_betwwn_straights[2]/2))),
        Math.PI*(3*(dist_betwwn_straights[2]/2+0.4+dist_betwwn_straights[2]/2)-Math.sqrt((3*(dist_betwwn_straights[2]/2+0.4)+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+0.4+3*dist_betwwn_straights[2]/2))),
        Math.PI*(3*(dist_betwwn_straights[2]/2+0.4+dist_betwwn_straights[2]/2)-Math.sqrt((3*(dist_betwwn_straights[2]/2+0.4)+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+0.4+3*dist_betwwn_straights[2]/2)))-Math.PI*(3*(dist_betwwn_straights[2])-Math.sqrt((3*dist_betwwn_straights[2]/2+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+3*dist_betwwn_straights[2]/2))),
        250/(250+Math.PI*(3*(dist_betwwn_straights[2]/2+0.4+dist_betwwn_straights[2]/2)-Math.sqrt((3*(dist_betwwn_straights[2]/2+0.4)+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+0.4+3*dist_betwwn_straights[2]/2)))
        -Math.PI*(3*(dist_betwwn_straights[2])-Math.sqrt((3*dist_betwwn_straights[2]/2+dist_betwwn_straights[2]/2)*(dist_betwwn_straights[2]/2+3*dist_betwwn_straights[2]/2))))
    ];

    const track_dist_mult = (Adelaide[9]+Brisbane[9]+Tokyo[9])/3; //multiplier for distance effectively travelled on black

    // console.log("Adelaide: "+Adelaide);
    // console.log("Brisbane: "+Brisbane);
    // console.log("Tokyo: "+Tokyo);
    // console.log("track_dist_mult: "+track_dist_mult); //0.99499

    let url = 'Track_geometry_lookup.xls';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status === 200) {
            const blob = this.response;
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(blob);
            fileReader.onload = function (file) {
                let dataBinary = file.target.result;
                // xlsx.js读取
                let workBook = XLSX.read(dataBinary, {type: 'binary', cellDates: true});
                let workSheet = workBook.Sheets["Track_geometry_lookup"];
                const data = XLSX.utils.sheet_to_json(workSheet);
                console.log(data);
            };
        }
    };
    xhr.send();



    // Lean_angle_lookup sheet

    let url2 = 'Lean_angle_lookup.xlsx';
    xhr = new XMLHttpRequest();
    xhr.open('GET', url2, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status === 200) {
            const blob = this.response;
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(blob);
            fileReader.onload = function (file) {
                let dataBinary = file.target.result;
                // xlsx.js读取
                let workBook = XLSX.read(dataBinary, {type: 'binary', cellDates: true});
                let workSheet = workBook.Sheets["Lean_angle_lookup"];
                const data = XLSX.utils.sheet_to_json(workSheet);
                console.log(data);
            };
        }
    };
    xhr.send();



    // Input_Output sheet

    // Constants and input
    const dt = 0.025; //sec
    const v0 =  0.1; // m/sec
    const hl_length = 125; //m
    const air_density = 1.17; // kg/m^3
    const bike_length = 1.75; //m
    const spacing = 0.25; //m
    const weight_dist_fr_rr = 0.6; //percentage
    const crr_front = 0.0016;
    const crr_rear = 0.0016;
    const mu_scrub = 0.0072; // empirical constant
    const efficiency = 0.975; // percentage
    const mol_whl_front = 0.08; // kg.m^2
    const mol_whl_rear = 0.08; // kg.m^2
    const wheel_radius = 0.336;
    const time_standing = 17; //sec
    const track_geo = 'BRI'; //BRI (Brisbane only)
    const disk_from_black_line = 0.4; //default 0.2
    const lap1_profile = 'male'; //Male of Female
    const reaction_time = 0.15; //sec
    const second_team = false; //Qual or R1 / final?
    const third_rider_dist_behind_at_finish = 1; //no of bikezc lengths behind over finish line\


    // Quick increments
    const CDA_delta = 0.000; //m^2
    const static_mass_delta = 0.00; // kg
    const crr_delta = 0.0000;
    const power = 0; //Watts
    const starter_power_laps_1_2 = 0; //Watts

    // calculate team seated average w/cda (WILL NEED TO DO) - it maybe be admin input



    // Input rider data
    var R1_I='Rider1'  ;
    var R2_I='Rider2'  ;
    var R3_I='Rider3'  ;
    var R4_I='Rider4'  ;

    // user input_details = [Mass(kg),CDA seated(m^2), seat height from ground(m), Critical power,
    // Turn 1 power, Turn 2 power, Turn 3 power, Turn 4 power, Turn 5 power, CDA standing
    // Energy total(KJ),Over CP energy(KJ), 5 sec power, 1 min power, 3 min power]

    var A =['A', 88, 0.170, 1.03, 380, 650, 630, 630, 630, 630, 0.5, 115, 30, 1400, 800, 570] ;
    var B =['B', 90, 0.180, 1.09, 410, 670, 670, 650, 650, 650, 0.5, 125, 38, 1350, 800, 570] ;
    var C =['C', 86, 0.170, 1.03, 380, 630, 630, 650, 650, 650, 0.5, 110, 30, 1300, 800, 570] ;
    var D =['D', 88, 0.180, 1.00, 400, 650, 630, 630, 630, 630, 0.5, 125, 38, 1400, 800, 570] ;
    var E =['E', 80, 0.167, 1.03, 390, 630, 630, 630, 630, 630, 0.5, 110, 30, 1150, 800, 570] ;

    var riderInfo = [A, B, C, D, E] ;

    // Start order
    var start_order = ['A','E','D','B'];
    var Rider_P1 = [start_order[0]];
    var Rider_P2 = [start_order[1]];
    var Rider_P3 = [start_order[2]];
    var Rider_P4 = [start_order[3]];

    // initial turn_duration
    var turn_durations = [2.25, 2, 2, 2, 1, 2, 2.5, 2.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var checkSum16 = sum(turn_durations);

    // CDA scalling
    var CDA_scaling = [0.980, 0.700, 0.600, 0.620]; //Empirical Constants



    //Turn duration in metres
    var turn_durations_metres = [];
    var total_distance = 0;
    for (var i = 0; i < turn_durations.length; i++) {
        turn_durations_metres[i] = turn_durations[i]*250/track_dist_mult ; //initial turn_durations_metres
        total_distance += turn_durations_metres[i] ;
    }
    // console.log("turn_durations_metres: "+turn_durations_metres);

    // console.log("totral_distance: "+total_distance);  // 4020.1502556611317


    //Cumulative turn durations in metres
    var cumulative_turn_durations= [];
    cumulative_turn_durations[0] = turn_durations_metres[0] ;
    for (var i = 1; i < turn_durations_metres.length; i++) {
        cumulative_turn_durations[i] = cumulative_turn_durations[i-1]+turn_durations_metres[i] ;
    }
    // console.log("cumulative_turn_durations: "+cumulative_turn_durations);


    //half lap   rel airspeed   stabilised
    var stabilised = 0;
    if(second_team == true){
        stabilised = 0.5;
    }else{
        stabilised = 0.3;
    }

    //initial rel_airspeed in 32 half laps
    var rel_airspeed = [];
    for (var i = 0; i<32;i++){
        if(i<3){
            rel_airspeed[i] = 0.00;
        }else{
            rel_airspeed[i]=stabilised;
        }
    }

    // NOT SURE WHAT IS HAPPENING AFTER THIS - Poojan

    // console.log(rel_airspeed);

    //Outer while loop - iterate the goal time
    var iterationCounter = 1;

    //define turn_order  Start order: A , E , D , B
    var turn_order = [A , E , D , B];

    // dis at end
    var dist_at_end= [];
    dist_at_end[0] = hl_length / track_dist_mult;
    // console.log("dis at end");
    //console.log(dist_at_end[0]);
    for (var i = 1; i <= 32; i++) {
        dist_at_end[i] = dist_at_end[i - 1] + hl_length / track_dist_mult;
    }

    var Time = [0.025];  //B3
    var Turn_ID_order = ["A1","E1","D1","B1", "A2","E2","D2","B2", "A3","E3","D3","B3", "A4","E4","D4","B4", "A5","E5","D5","B5"];
    var Turn_ID = [0]; // C3
    var Turn_ID_array = [Turn_ID_order[Turn_ID[0]]]; //C3
    var Vel_CoM = [0.1];  //K3
    var CoM_dist = [Vel_CoM * dt]; //L3
    var Wheel_dist = [CoM_dist];  //M3
    var Wheel_speed = [Vel_CoM];  //N3
    var Turn_distance = [Time * Vel_CoM];  //O3
    var Total_dist = [Turn_distance];  //H3
    var Rider_lead_turn = [Turn_ID_order[Turn_ID[0]].substring(1)]; //J3
    var Turn_length =[turn_durations_metres[Turn_ID[0]]]; //P3
    var Half_lap_ID = [1]; //Q3
    var Dist_at_end_of_this_half_lap = [dist_at_end[0]]; //R3
    var End_of_half_lap = [0]; //S3
    var Half_lap_time = [""]; // T3
    var Percent_half_lap = [Turn_distance / (hl_length/ track_dist_mult)]; // V3



    var Seat_height =[turn_order[0][3]]; //Z3
    var Mass = [turn_order[0][1]]; //AA3
    if(Time<time_standing){
        var CDA = [CDA_scaling[0]*(CDA_delta+turn_order[0][10])]; //AB3
    }else{
        CDA = [CDA_scaling[0]*(CDA_delta+turn_order[0][2])]; //AB3
    }

    // console.log("CDA: "+CDA); //AB3

    //var Half_lap_time = "";

    // Half_lap_time T3
    if (End_of_half_lap == 0) {
        Half_lap_time = [""];
    } else {
        Half_lap_time = [time + ((Dist_at_end_of_this_half_lap - total_distance)/Wheel_speed)];
    }

    //Half_lap_dist U3
    var Half_lap_dist = [Total_dist-(Dist_at_end_of_this_half_lap-(hl_length/track_dist_mult))];
    // console.log("Half_lap_dist: "+Half_lap_dist); //U3


    //Power in, W


    var Power_in = 0;
    if(lap1_profile=="male"){
        Power_in = [laponepm(Time)*efficiency]; //I3
    }else{
        Power_in = [laponepf(Time)*efficiency];  //I3
    }

    // console.log("Power_in: "+laponepm(Time));
    // console.log("lap pf: " + laponepf(Time));

    // //Rider P1, Rider P2, Rider P3, Rider P4 = turn order
    // if(Turn_distance>Turn_length){
    //     turn_order = start_order[turn_ID];
    // }

    var Calculates = []; //output Calcs



    // console.log("Excel Calcs: ");
    // // console.log(Turn_ID_order[Turn_ID], turn_order, Total_dist, Rider_lead_turn);
    // for(i = 0;i<Calculates.length;i++){
    //     console.log(Calculates[i]);
    // }


    for(i=1;i<3;i++){
        Time.push(Time[i-1]+dt);
        //Turn_ID
        if(Turn_distance>Turn_length){
            Turn_ID.push(Turn_ID[i-1]+1);
        }else{
            Turn_ID.push(Turn_ID[i-1]);
        }

        Turn_ID_array.push(Turn_ID_order[Turn_ID[i]]);

        //start order D:G

        if(Turn_ID_order[Turn_ID[i]].substring(0,1)=='A'){
            start_order = ['A','E','D','B'];
        }else if(Turn_ID_order[Turn_ID[i]].substring(0,1)=='E'){
            start_order = ['E','D','B','A'];
        }else if(Turn_ID_order[Turn_ID[i]].substring(0,1)=='D'){
            start_order = ['D','B','A','E'];
        }else if(Turn_ID_order[Turn_ID[i]].substring(0,1)=='B'){
            start_order = ['B','A','E','D'];
        }
        Rider_P1.push(start_order[0]);
        Rider_P2.push(start_order[1]);
        Rider_P3.push(start_order[2]);
        Rider_P4.push(start_order[3]);

        //Turn_length


        //Wheel_speed



        //Turn distance
        // if(Turn_ID_array[i]!=Turn_ID_array[i-1]){
        //     Turn_distance =
        // }

        //Total dist
        // if(Turn_ID_array[i]!=Turn_ID_array[i-1]){

        // }


        //Power in, W
        if(lap1_profile=="male"){
            Power_in.push(laponepm(Time[i])*efficiency); //I3
        }else{
            Power_in.push(laponepf(Time[i])*efficiency);  //I3
        }
    }

    Calculates.push(Time);
    Calculates.push(Turn_ID_array);
    Calculates.push(Rider_P1);
    Calculates.push(Rider_P2);
    Calculates.push(Rider_P3);
    Calculates.push(Rider_P4);
    Calculates.push(Total_dist);
    Calculates.push(Power_in);
    Calculates.push(Rider_lead_turn);
    Calculates.push(Vel_CoM);
    Calculates.push(CoM_dist);
    Calculates.push(Wheel_dist);
    Calculates.push(Wheel_speed);
    Calculates.push(Turn_distance);
    Calculates.push(Turn_length);
    Calculates.push(Half_lap_ID);
    Calculates.push(Dist_at_end_of_this_half_lap);
    Calculates.push(End_of_half_lap);
    Calculates.push(Half_lap_time);
    Calculates.push(Half_lap_dist);
    Calculates.push(Percent_half_lap);
    Calculates.push(Seat_height);
    Calculates.push(Mass);
    Calculates.push(CDA);

    console.log("Excel Calcs: ");
    // console.log(Turn_ID_order[Turn_ID], turn_order, Total_dist, Rider_lead_turn);
    for(i = 0;i<Calculates.length;i++){
        console.log(Calculates[i]);
    }
}