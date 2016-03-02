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

// check for game end when all tiles matched.
function checkEnd () {
  if ($("td").length===$("td.matched").length) {
    gameOver = true;
    console.log(guessCounter);
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

});