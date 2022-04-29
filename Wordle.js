var word = ""
var table;
var keys;
var won = false;
var wordBank = ["autotroph", //Matteo Salverio
    "enviornment",
    "niche",
    "estivation",
    "nocturnal", //5
    "gene",
    "allele",
    "cell",
    "mitochondria",
    "hydrophobic", //10
    "adenine", //Cayla Lyman
    "ribose",
    "chloroplasts",
    "glycolysis",
    "interphase", //15
    "phagocytosis",
    "leukocyte",
    "pathogen",
    "mutation",
    "mutagens" //20
]
var questionBank = ["an organism with the ability to produce its own food/energy", //Matteo Salverio
    "where something lives",
    "a species' way of life",
    "hibernation in the summer",
    "active at night", //5
    "unit of heredity that determines some characteristics",
    "one or two more versions of a gene",
    "smallest unit that can carry on all processes of life",
    "powerhouse of the cell",
    "repells water", //10
    "molecule that contains nitrogen", //Cayla Lyman
    "a C3 sugar",
    "organelles that trap light",
    "the process in which 1 glucose molecule is broken down into 2 Pyruvic Acid molecules",
    "prior to mitosis, is the longest phase", //15
    "when a white blood cell engulfs bacteria and viruses",
    "white blood cell",
    "disease-causing germs",
    "changes in the DNA, sometimes an incorrect protien is created",
    "cause mutations" //20
]
var num = Math.floor(Math.random() * wordBank.length)
word = wordBank[num].toUpperCase()
//document.write(word)
var label = document.getElementById("label");
label.innerHTML = "Enter a " + word.length + " letter word that means " + questionBank[num]
var tries = 6
document.addEventListener('keypress', (event) => {
    var name = event.key.toUpperCase();
    ProcessButtons(name)
}, false);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Backspace":
            ProcessButtons("BKSP");
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);
function createTable() {
    var toWrite = ""
    toWrite += ("<table border='1px' id='table'>")
    for (var i = 0; i < 6; i++) {
        toWrite += ("<tr>")
        for (var j = 0; j < word.length; j++) {
            toWrite += ("<th id='[" + i + "," + j + "]'> </th>")
        }
        toWrite += ("</tr>")
    }
    toWrite += ("</table>")
    table = document.getElementById("tableDiv")
    table.innerHTML = toWrite;
}
var btns;
function createKeys() {
    var alphabet = "QWERTYUIOPASDFGHJKL3ZXCVBNM4"
    var aCount = 0
    var toWrite = ""
    var w = 10;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < w; j++) {
            var key = alphabet[aCount]
            if (key == "3")
                key = "ENTER"
            else if (key == "4")
                key = "BKSP"
            toWrite += "<button id='" + key + "' class='kb' style='height: 60px; width: 45px'>" + key + "</button>"
            aCount++
        }
        toWrite += "<br>"
        w--
        if (w == 8)
            w++
    }
    keys = document.getElementById("keysDiv")
    keys.innerHTML = toWrite;
    document.getElementById("ENTER").style = "height: 60px; width: 68px"
    document.getElementById("BKSP").style = "height: 60px; width: 68px"
    btns = document.getElementsByClassName("kb")
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var clicked = this.innerHTML
            ProcessButtons(clicked)
        });
    }
}
var guess = ""
var r = 0, c = 0
function ProcessButtons(k) {
    if (guess.length < word.length && k != "ENTER" && k != "BKSP") {
        guess += k
        var placeKey = document.getElementById("[" + r + "," + c + "]")
        placeKey.innerHTML = k
        c++
    }
    else if (k == "BKSP" && c > 0) {
        c--
        guess = guess.substring(0, guess.length - 1)
        var placeKey = document.getElementById("[" + r + "," + c + "]")
        placeKey.innerHTML = ""
    }
    else if (k == "ENTER") {
        if (!won) {
            for (var cD = 0; cD < word.length; cD++) {
                if (document.getElementById("[" + r + "," + cD + "]").innerHTML == " ")
                    document.getElementById("[" + r + "," + cD + "]").innerHTML = " "
            }
        }
        else {
            RefreshPage();
        }
        ProcessGuess(guess)
        r++
        c = 0
        guess = ""
    }
}
function ProcessGuess(g) {
    var finish = document.getElementById("finish")
    if (tries > 0) {
        SetColors()
        if (g == word) {
            label.innerHTML = "You won in " + (6 - tries + 1) + " tries!"
            won = true;
        }
        tries--
        if (tries == 0)
            label.innerHTML = "The word was " + word + ". Better luck next time!"
    }
    else
        label.innerHTML = "The word was " + word + ". Better luck next time!"
}
function SetColors() {
    var check
    var count = 0
    var guessWord = ""
    for (var i = 0; i < word.length; i++) {
        check = document.getElementById("[" + r + "," + i + "]")
        guessWord += check.innerHTML
    }
    for (var i = 0; i < word.length; i++) {
        check = document.getElementById("[" + r + "," + i + "]")
        keyCheck = document.getElementById(check.innerHTML)
        if (check.innerHTML == word[i]) {
            check.style = "background-color: green"
            keyCheck.style = "background-color: green; height: 60px; width: 45px;"
            count++
        }
        else if (CountLetterInWord(check.innerHTML) > 0) {
            check.style = "background-color: darkgoldenrod"
            keyCheck.style = "background-color: darkgoldenrod; height: 60px; width: 45px;"
            count++
        }
        else {
            check.style = "background-color: gray"
            try {
                keyCheck.style = "background-color: gray; height: 60px; width: 45px;"
            }
            catch {
                console.log("Style setting failed!")
            }
        }
    }
}
function CountLetterInWord(letter) {
    var found = 0
    for (var i = 0; i < word.length; i++) {
        if (letter == word[i]) {
            found++
        }
    }
    return found;
}
function RefreshPage() {
    document.location.reload()
}
createTable()
createKeys()
