

 $(document).ready(function() {

var words = ["technical", "brawler", "swarmer", "gloves", "ropes", "stance", "southpaw", "footwork", "boxing", "nintendo", "tyson", "heavyweight", "champion", "uppercut","dodge","knockout","referee","hippo","sandman","punch","block"];
var lose = 10;
var validGuesses = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letter;
var allGuesses = [];
var incorrectGuesses = [];
var correctGuesses = [];
var answer = "ignoreFirstKey";
var answerDisplay = [];
for (var i = 0; i < answer.length; i++) {
    answerDisplay.push("_");
};
var distinctLetters = [];    
for (var i = 0; i < answer.length; i++) {
    if (distinctLetters.indexOf(answer[i]) === -1) {
        distinctLetters.push(answer[i]);
    }
};    
var win = distinctLetters.length; 
var globalWins = 0;
var globalLosses = 0;
var formContent = "This is my dynamic content";


function reset() {
    allGuesses.length = 0;
    incorrectGuesses.length = 0;
    correctGuesses.length = 0;
    distinctLetters.length = 0;
    answer.length = 0;
    answerDisplay.length = 0;
    win.length = 0;
    answer = words[Math.floor(Math.random() * words.length)];
    for (var i = 0; i < answer.length; i++) {
        answerDisplay.push("_");
    };
    for (var i = 0; i < answer.length; i++) {
        if (distinctLetters.indexOf(answer[i]) === -1) {
            distinctLetters.push(answer[i]);
        }
    };   
    win = distinctLetters.length;
}

function logLetter(letter) {
    allGuesses.push(letter);

    if (answer.indexOf(letter) !== -1) {
        correctGuesses.push(letter);
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] === letter) {
                answerDisplay[i] = letter;
            }
        }
    } else if (answer.indexOf(letter) === -1) {
        incorrectGuesses.push(letter);
    }     
}

function doModal(heading, formContent) {
    html =  '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>'+heading+'</h4>'
    html += '</div>';
    html += '<div class="modal-body">';
    html += formContent;
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // footer
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal").modal();
    $("#dynamicModal").modal('show');

    $('#dynamicModal').on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

}


function hideModal() {
    $('.modal.in').modal('hide');
}


function winLose() {
    if (correctGuesses.length === win) {
        doModal("You win!", formContent);
        globalWins++;
    } 

    if (incorrectGuesses.length === lose) {
        for (var i = 0; i < answer.length; i++) {
            if (answerDisplay[i] === "_") {
                answerDisplay[i] = answer[i];
            }
        }
        doModal("Sorry, try again!", formContent);
        globalLosses++;                        
    }    
}


document.onkeyup = function(event) {
    
    var letter = String.fromCharCode(event.which).toLowerCase();
    if (answer === "ignoreFirstKey") {
        reset();
    } else if ((validGuesses.indexOf(letter) !== -1) && 
        (allGuesses.indexOf(letter) === -1) && 
        (correctGuesses.length !== win) && 
        (incorrectGuesses.length !== lose)) {
        logLetter(letter);
        winLose();           
    }  else if ((correctGuesses.length === win) || 
        (incorrectGuesses.length === lose)) {
        reset(); 
    }


var html =
'<div class="row row-margin-sm row-margin">' +
    '<div class="col-md-3"><div class="mac' + incorrectGuesses.length + '"></div></div>' +
    '<div class="col-md-6 col-background">' +
            '<div class="row row-margin-sm">' +
                    '<div class="col-md-12 header-style col-background">' +
                        '<h1>' + answerDisplay.join(" ") + '</h1>' +
                    '</div>' +
            '</div>' +
            '<div class="row row-margin-sm">' +
                    '<div class="col-md-6 col-background">' +
                        '<div class="panel panel-info" id="panel">' +
                            '<div class="panel-heading" id="panel-format">Match Stats</div>' +
                            '<div class="panel-body panel-content">' +
                                '<p>Wins: ' + globalWins + '</p>' +
                                '<p>Losses: ' + globalLosses + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-6 col-background">' +
                        '<div class="panel panel-info" id="panel">' +
                            '<div class="panel-heading" id="panel-format">Round Stats</div>' +
                            '<div class="panel-body panel-content">' +
                                '<p>Letters Guessed: ' + allGuesses.join(", ") + '</p>' +
                                '<p>Chances Left: ' + (lose-incorrectGuesses.length) + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div id="myModal" class="modal fade" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Modal Header</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p>Some text in the modal.</p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '</div>' +
                    '</div>' +

                    '</div>' +
                    '</div>' +
            '</div>' +
    '</div>' +
    '<div class="col-md-3"><div class="mario' + incorrectGuesses.length + '"></div></div>' +
'</div>'
;

    document.querySelector("#game").innerHTML = html;   

    // console.log("Letter: " + letter);
    // console.log("All Guesses: " + allGuesses);
    // console.log("Correct Guesses: " + correctGuesses);
    // console.log("Incorrect Guesses: " + incorrectGuesses);
    // console.log("Answer has " + win + " letters");
    // console.log("Correct Guesses Total: " + correctGuesses.length);
    // console.log("Incorrect Guesses Total: " + incorrectGuesses.length);
    // console.log("Guesses Total: " + allGuesses.length);
    // console.log("WINS: " + globalWins);
    // console.log("LOSSES: " + globalLosses);
    // console.log("-------------------");    
};

 });