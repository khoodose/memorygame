$(function(){
  console.log("page loaded and ready to go");

// helper function for checking when we select elements
function alertTest () {
  alert("Pick me, pick me!");
}

// check if there has been a first selection
var earlierSelection = false;

// track if either player has won.
var playerWin = false;

// track number of guesses
var guessCounter = 0;
var dudeScore = 0;
var girlScore = 0;

var girlArray = ["imgs/cake.png", "imgs/candle.png", "imgs/chocolate.png", "imgs/music.png", "imgs/pizza.png", "imgs/wine.png", "imgs/utensils.png", "imgs/cards.png", "imgs/macaron.png", "imgs/hat.png", "imgs/present.png", "imgs/polaroid.png", "imgs/cake.png", "imgs/candle.png", "imgs/chocolate.png", "imgs/music.png", "imgs/pizza.png", "imgs/wine.png", "imgs/utensils.png", "imgs/cards.png", "imgs/macaron.png", "imgs/hat.png", "imgs/present.png", "imgs/polaroid.png"];

var dudeArray = ["imgs/basketball.png", "imgs/beer.png", "imgs/burger.png", "imgs/donut.png", "imgs/drums.png", "imgs/drumstick.png", "imgs/football.png", "imgs/guitar.png", "imgs/mic.png", "imgs/sunglasses.png", "imgs/whisky.png", "imgs/xbox.png", "imgs/basketball.png", "imgs/beer.png", "imgs/burger.png", "imgs/donut.png", "imgs/drums.png", "imgs/drumstick.png", "imgs/football.png", "imgs/guitar.png", "imgs/mic.png", "imgs/sunglasses.png", "imgs/whisky.png", "imgs/xbox.png"];


function makeRandomArray (array) {
  var randomArray = [];

  for (var i=0; i<24; i++) {
    var randomInd = Math.floor(Math.random()*array.length);
    var image = array[randomInd];
    randomArray.push(image);
    array.splice(randomInd, 1);
  }

  return randomArray;
}

function populateTiles (array) {
  for (var i=1; i<=24; i++) {
    var index = i;
    $("#cell"+index).find("img").attr("src", array[i-1]);
  }
}

var gArray = makeRandomArray(girlArray);
var dArray = makeRandomArray(dudeArray);

// default array of objects given the default theme
populateTiles(gArray);

// check for game end when all tiles matched.
function checkEnd () {
  if ($("td").length===$("td.matched").length) {
    playerWin = true;

    // check the stylesheet to know whose score it is.
    if ($("#role").attr("href")==="css/style.css") {
      girlScore = guessCounter;
      console.log(girlScore);
    }

    else if ($("#role").attr("href")==="css/dude.css") {
      dudeScore = guessCounter;
      console.log(dudeScore);
    }

    alert("Winner, winner, chicken dinner!\nYou did it in " + guessCounter + " turns.");

    // put logic here to switch to dude or girl (with instruction) if this was 1st player and end the game if it's 2nd player.
    if (dudeScore===0 || girlScore===0) {
      alert("Now it's time for player 2 to show what you can do.  Click 'switch roles' to begin!");
    }

    else if (dudeScore<girlScore) {
      alert("But as Duncan McLeod said, 'There can be only one.'\nTonight's overall winner and unofficial party planner of the year is playa bro!");

      location.reload();
    }
    else if (girlScore<dudeScore) {
      alert("But as Duncan McLeod said, 'There can be only one.'\nTonight's overall winner and unofficial party planner of the year is playa girl!");

      location.reload();
    }

  }
}

// main function driving the logic on each click
function eachTurn () {

  // if cell is already matched, player must choose another
  if ($(this).attr("class")==="matched") {
    alert("This one's matched. Quick, choose another!");
  }

  // if player clicks on already selected cell, must choose another
  else if ($(this).attr("class")==="selected") {
    alert("You just clicked on this one. Choose another.");
  }

  // if no other cell has been selected (first selection)
  else if (earlierSelection===false) {

    $(this).removeClass("default").addClass("selected");
    earlierSelection = true;

  }

  // if one other cell has been selected (second selection)
  else if (earlierSelection===true) {

    $(this).removeClass("default").addClass("selected");

    var firstImage = $(".selected").eq(0).find("img").attr("src");
    var secondImage = $(".selected").eq(1).find("img").attr("src");


    if (firstImage===secondImage) {
      // set both cells' classes to "matched"
      $(".selected").eq(0).removeClass("selected").addClass("matched");
      // the second element has become the first
      $(".selected").eq(0).removeClass("selected").addClass("matched");

      guessCounter++;
      checkEnd();

    }

    else {
      // reset both cells' classes to default
      $(".selected").eq(0).removeClass("selected").addClass("default");
      $(".selected").eq(0).removeClass("selected").addClass("default");

      guessCounter++;

    }

    earlierSelection = false;

  }

}


// add logic for when tile is clicked
$("td").on("click", eachTurn);

function roleSwitch () {
  // if current role is girl, switch to dude
  if ($("#role").attr("href")==="css/style.css") {

    if (guessCounter>0 && playerWin===false) {
      alert("Sorry, this turn has already begun.  Please finish it!");
    }
    else {
      $("#role").attr("href", "css/dude.css");
      $("td").removeClass().addClass("default");
      populateTiles(dArray);
      guessCounter=0;
    }

  }
  // if current role is dude, switch to girl
  else {

    if (guessCounter>0 && playerWin===false) {
      alert("Sorry, this turn has already begun.  Please finish it!");
    }
    else {
      $("#role").attr("href", "css/style.css");
      $("td").removeClass().addClass("default");
      populateTiles(gArray);
      guessCounter=0;
    }
  }

}

// change stylesheet when switch role button clicked
$("#switch").on("click", roleSwitch);

});