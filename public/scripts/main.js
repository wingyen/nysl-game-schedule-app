

var nyslData = data

var app = new Vue({
    el: "#app",
    data: {
        data: nyslData,
        schedule: [],
        teams: [],
        teamSchedule: [],
        selectedTeamName: "",
        showLoader: true
    },

    created: function () {
        this.getSchedule();
        this.teams = this.data.teams;
        this.showLoader= false;

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
                function (val) {
                    return (val.team1 != undefined && val.team1.includes(teamName))
                        || (val.team2 != undefined && val.team2.includes(teamName))
                }
            )
            this.teamSchedule = myTeamSchedule;
            this.selectedTeamName = teamName;

            $('#myModal').toggle();


        },
        // gAlert: function(){
        //     let check = confirm("Do you want to open Google Maps?");
        //     if (check == true) {
        //         return true;
        //    }
        //     else {
        //         return false;
        //    }
        // }

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
function gAlert(name) {
    let el = document.getElementsByClassName(name);
console.log(el)
    for (let i = 0; i < el.length; i++) {
        el[i].onclick = function () {
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
gAlert('field');
gAlert('fieldT')



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