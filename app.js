$(function(){
  console.log("page loaded and ready to go");


// helper function for checking when we select elements
function alertTest () {
  alert("Pick me, pick me!");
}

// check if there has been a first selection
var earlierSelection = false;

// track if game is over.
var gameOver = false;

// track number of guesses
var guessCounter = 0;

var imageArray = ["imgs/cake.png", "imgs/candle.png", "imgs/chocolate.png", "imgs/music.png", "imgs/pizza.png", "imgs/wine.png", "imgs/utensils.png", "imgs/cards.png", "imgs/macaron.png", "imgs/hat.png", "imgs/present.png", "imgs/polaroid.png", "imgs/cake.png", "imgs/candle.png", "imgs/chocolate.png", "imgs/music.png", "imgs/pizza.png", "imgs/wine.png", "imgs/utensils.png", "imgs/cards.png", "imgs/macaron.png", "imgs/hat.png", "imgs/present.png", "imgs/polaroid.png"];

var dudeArray = ["imgs/basketball.png", "imgs/beer.png", "imgs/burger.png", "imgs/donut.png", "imgs/drums.png", "imgs/drumstick.png", "imgs/football.png", "imgs/guitar.png", "imgs/mic.png", "imgs/sunglasses.png", "imgs/whisky.png", "imgs/xbox.png", "imgs/basketball.png", "imgs/beer.png", "imgs/burger.png", "imgs/donut.png", "imgs/drums.png", "imgs/drumstick.png", "imgs/football.png", "imgs/guitar.png", "imgs/mic.png", "imgs/sunglasses.png", "imgs/whisky.png", "imgs/xbox.png"];

var randomArray = [];

// need to hard-code the end value for now
for (var i=0; i<24; i++) {
  var randomInd = Math.floor(Math.random()*imageArray.length);
  var image = imageArray[randomInd];
  randomArray.push(image);
  imageArray.splice(randomInd, 1);
}

// push the images into each tile
for (var i=1; i<=24; i++) {
  var index = i;
  $("#cell"+index).find("img").attr("src", randomArray.shift());
}

// can't get the append approach to work yet
// for (var i=1; i<=24; i++) {
//   var index = i;
//   $("#cell"+index).append("<img src="+randomArray.shift()+"/>");
// }

// check for game end when all tiles matched.
function checkEnd () {
  if ($("td").length===$("td.matched").length) {
    gameOver = true;
    alert("Winner, winner, chicken dinner!\nYou did it in " + guessCounter + " turns.");
    location.reload();
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

// console.log($("td").length);
// console.log($("td.matched").length);

// add logic for when tile is clicked
$("td").on("click", eachTurn);

function roleSwitch () {

  if ($("#role").attr("href")==="css/style.css") {
    $("#role").attr("href", "css/dude.css");
  }
  else {
    $("#role").attr("href", "css/style.css");
  }
}

// change stylesheet when switch role button clicked
$("#switch").on("click", roleSwitch);

});