

var nyslData = data

var app = new Vue({
    el: "#app",
    data: {
        data: nyslData,
        schedule: [],
        teams: [],
        teamSchedule: [],
        selectedTeamName: "",
    },

    created: function () {
        this.getSchedule();
        this.teams = this.data.teams;

    },
    methods: {
        getSchedule: function () {
            //making some public data nicer for myself 
            this.schedule = this.data.schedule2018.map(function (x) {
                return {
                    date: x.date,
                    timeStart: x.time_start,
                    timeEnd: x.time_end,
                    team1: x.team1 != null ? x.team1.trim() : "",
                    team2: x.team2 != null ? x.team2.trim() : "",
                    location: x.location,
                    addressLink: x.address_link
                }
            });
        },

        showAllTeams: function () {
            this.teamSchedule = this.schedule
            $('#myModal').toggle();
        },
        showSingleTeam: function (x) {

            let teamName = x.team

            let myTeamSchedule = this.schedule.slice().filter(
                function (xx) {
                    return (xx.team1 != undefined && xx.team1.includes(teamName))
                        || (xx.team2 != undefined && xx.team2.includes(teamName))
                }
            )
            this.teamSchedule = myTeamSchedule;
            this.selectedTeamName = teamName;

            $('#myModal').toggle();

        }

    }

}) // Vue end******


function cardCollapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}
cardCollapse();

// Google Maps Alert
function gAlert() {
    let aElems = document.getElementsByClassName('field');

    for (let i = 0; i < aElems.length; i++) {
        aElems[i].onclick = function () {
            let check = confirm("Do you want to open Google Maps?");
            if (check == true) {
                return true;
            }
            else {
                return false;
            }
        };
    }

}
gAlert();

function GetAlert() {
    let check = confirm("Do you want to open Google Maps?");
    if (check == true) {
        return true;
    }
    else{
        return false;
    }
}

// function getInfo() {
//     let divEl = document.getElementsByClassName('team_logo');
//     for (let i = 0; i < divEl.length; i++) {
//         divEl[i].onclick = function () {
//             alert("The next game is on 08 Sep 2018.")
//         }
//     }
// }

// getInfo();

//function myModel() {
// Get the modal
//var modal = document.getElementById('myModal');

// Get the button that opens the modal
//var btn = document.getElementsByClassName("myModalTrigger")[0];

// Get the <span> element that closes the modal
//var spanClose = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
//  btn.onclick = function () {
//      modal.style.display = "block";
//  }



// When the user clicks on <span> (x), close the modal
// spanClose.onclick = function () {
//     modal.style.display = "none";
// }


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
//}

// myModel();

function myModelToggle() {

    $('#myModal_2').toggle();
}



// $(document).ready(function () {

//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });

// });

// side bar
// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
// }

// openNav();
// closeNav();