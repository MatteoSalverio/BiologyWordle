var wordI = ""
var table;
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
"the process b which 1 glucose molecule is broken down into 2 Pyruvic Acid molecules",
"prior to mitosis, is the longest phase", //15
"when a white blood cell engulfs bacteria and viruses",
"white blood cell",
"disease-causing germs",
"changes in the DNA, sometimes an incorrect protien is created",
"cause mutations" //20
]
var num = Math.floor(Math.random() * wordBank.length)
wordI = wordBank[num].toUpperCase()
//document.write(wordI)
var label = document.getElementById("label");
label.innerHTML = "Enter a " + wordI.length + " letter word that means " + questionBank[num]
textBox = document.getElementById("myInput")
var tries = 6
function writeInp(text) {
    for (var i = 0; i < 6; i++) {
        if (document.getElementById("[" + i + ",0]").innerHTML != " ")
            continue;
        for (var j = 0; j < text.length; j++) {
            var loc = document.getElementById("[" + i + "," + j + "]");
            loc.innerHTML = text[j];
            if (text[j] == wordI[j]) {
                loc.style = "background-color: greenyellow;"
            }
            else if (wordI.indexOf(text[j]) > -1) {
                loc.style = "background-color: orange;"
            }
            else {
                loc.style = "background-color: red;"
            }
        }
        break;
    }
}
var inputVal = ""
function getInputValue() {
    inputVal = document.getElementById("myInput").value;
    writeInp(inputVal.toUpperCase())
    textBox.value = ""
    return inputVal
}
document.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        Game()
    }
});
function createTable() {
    var toWrite = ""
    toWrite += ("<table border='1px' id='table'>")
    for (var i = 0; i < 6; i++) {
        toWrite += ("<tr>")
        for (var j = 0; j < wordI.length; j++) {
            toWrite += ("<th id='[" + i + "," + j + "]'> </th>")
        }
        toWrite += ("</tr>")
    }
    toWrite += ("</table>")
    table = document.getElementById("tableDiv")
    table.innerHTML = toWrite;
}
function Game(word) {
    word = wordI
    var won = false
    if (tries > 0) {
        var answer = ""
        tries -= 1
        answer = getInputValue().toUpperCase()
        if (answer == word) {
            won = true
            tries = 0
        }
    }//if (tries > 0)
    if (won) {
        //alert("You won!")
        console.log("You won!")
    }
    else if (tries == 0) {
        var finish = document.getElementById("finish");
        finish.innerHTML = "The word was " + word
        alert("Better luck next time!")
    }
}//Game

createTable()
