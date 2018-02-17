

 $(document).ready(function() {

var words = {
    "technical": "A bout ends by technical knockout (TKO) if a fighter is knocked down three times in one round.",
    "brawler": "A brawler is a fighter who generally lacks finesse and footwork in the ring, but makes up for it through sheer punching power.",
    "swarmer": "A swarmer is a fighter who attempts to stay close to the opponent, throwing intense flurries and combinations of hooks and uppercuts.",
    "gloves": "Gloves have been required in competition since the late nineteenth century, though modern boxing gloves are much heavier than those worn by early twentieth-century fighters.",
    "ropes": "Boxing matches typically take place in a boxing ring, a raised platform surrounded by ropes attached to posts rising in each corner.",
    "stance": "The modern stance has a more upright vertical-armed guard, as opposed to the more horizontal, knuckles-facing-forward guard adopted by early 20th century hook users such as Jack Johnson.",
    "southpaw": "Left-handed or southpaw fighters use a mirror image of the orthodox stance, which can create problems for orthodox fighters unaccustomed to receiving jabs, hooks, or crosses from the opposite side.",
    "footwork": "Footwork involves keeping balance, closing in or furthering the distance, controlling spatial positioning, and/or creating additional momentum for strikes.",
    "boxing": "Boxing is a combat sport in which two people, usually wearing protective gloves, throw punches at each other for a predetermined set of time in a boxing ring.",
    "nintendo": "Mike Tyson's Punch-Out!! was released by Nintendo in 1987.",
    "tyson": "Nintendo contracted with Mike Tyson to use his likeness in Punch-Out!! before he won the World Boxing Council (WBC) heavyweight championship on November 22, 1986.",
    "heavyweight": "Boxers who weigh 200 pounds and over are considered heavyweights by major professional boxing organizations.",
    "champion": "Boxing has two internationally recognized boxing halls of fame: the International Boxing Hall of Fame (IBHOF) and the World Boxing Hall of Fame (WBHF).",
    "uppercut": "The uppercut is Little Mac's most powerful attack, and it can only be used after earning a star by counter-punching the opponent.",
    "dodge": "Little Mac can dodge left or right, duck, and block punches by putting up his guard.",
    "decision": "A bout ends by decision if the bout lasts three full rounds without a clear winner.",
    "knockout": "A bout ends by knockout (KO) if a fighter is unable to get up within ten seconds after being knocked down.",
    "referee": "Boxing is supervised by a referee over a series of one- to three-minute intervals called rounds.",
    "hippo": "Little Mac can only beat King Hippo by repeatedly punching him in the belly, causing his trunks to fall down with every hit.",
    "sandman": "Mr. Sandman's special move is the Dreamland Express, a sudden sequence of three rapid uppercuts.",
    "punch": "There are four basic punches in boxing: the jab, cross, hook, and uppercut.",
    "block": "Blocking uses the boxer's shoulder, hands, or arms as defensive tools to protect against incoming attacks.",
}
var lose = 10;
var validGuesses = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letter;
var wordkeys = Object.keys(words);
var globalWins = 0;
var globalLosses = 0;

var allGuesses = [];
var incorrectGuesses = [];
var correctGuesses = [];
var wordIndex = [];
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
var formContent = [];


function reset() {
    allGuesses.length = 0;
    incorrectGuesses.length = 0;
    correctGuesses.length = 0;
    wordIndex.length = 0;
    distinctLetters.length = 0;
    answer.length = 0;
    answerDisplay.length = 0;
    win.length = 0;
    formContent.length = 0;
    wordIndex = Math.floor(Math.random() * wordkeys.length);
    answer = wordkeys[wordIndex];
    for (var i = 0; i < answer.length; i++) {
        answerDisplay.push("_");
    };
    for (var i = 0; i < answer.length; i++) {
        if (distinctLetters.indexOf(answer[i]) === -1) {
            distinctLetters.push(answer[i]);
        }
    };   
    win = distinctLetters.length;
    formContent = words[answer];
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
    html += '<button type="button" class="close" data-dismiss="modal">×</button>';
    html += '<h4><strong>'+heading+'</strong></h4>'
    html += '</div>';
    html += '<div class="modal-body">';
    html += formContent;
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<button type="type" class="btn btn-green" data-dismiss="modal">Close</button>';
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
    '<div class="col-md-3 visible-xs visible-sm visible-md visible-lg"><div class="mac' + incorrectGuesses.length + '"></div></div>' +
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
            '</div>' +
    '</div>' +
    '<div class="col-md-3 hidden-xs hiddex-sm visible-md visible-lg"><div class="mario' + incorrectGuesses.length + '"></div></div>' +
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