$(function(){
  console.log("page loaded and ready to go");


// helper function to test whether we've grabbed the right element
function alertTest () {
  alert("Pick me, pick me!");
}

// variable to check whether there has been a first selection
var earlierSelection = false;

// variable to track if game is over. Not used for main flow yet.
var gameOver = false;

// function to check if game is over when all tiles are matched.
function checkEnd () {
  if ($("td").length===$("td.matched").length) {
    gameOver = true;
    alert("Winner, winner, chicken dinner!");
    location.reload();
  }
}

// main function driving the logic on each click
function eachTurn () {

  // if cell is already matched, player must choose another
  if ($(this).attr("class")==="matched") {
    alert("This one's matched. Quick, choose another!");
  }

  // if somehow player clicks on the previously selected cell, he/she must choose another
  else if ($(this).attr("class")==="selected") {
    alert("You just clicked on this one. Choose another.");
  }

  // if no other cell has been selected.
  else if (earlierSelection===false) {

    $(this).removeClass("default").addClass("selected");
    earlierSelection = true;

  }

  // if one other cell has been selected.
  else if (earlierSelection===true) {

    $(this).removeClass("default").addClass("selected");

    var firstImage = $(".selected").eq(0).find("img").attr("src");
    var secondImage = $(".selected").eq(1).find("img").attr("src");

    // console.log(firstImage);
    // console.log(secondImage);
    // console.log(firstImage===secondImage);

    if (firstImage===secondImage) {
      // now we need to set both classes to matched
      $(".selected").eq(0).removeClass("selected").addClass("matched");
      // the second element has become the first
      $(".selected").eq(0).removeClass("selected").addClass("matched");

      checkEnd();

    }

    else {
      // reset both classes to default
      $(".selected").eq(0).removeClass("selected").addClass("default");
      $(".selected").eq(0).removeClass("selected").addClass("default");
    }

    earlierSelection = false;

  }

}

// console.log($("td").length);
// console.log($("td.matched").length);

// add logic for when tile is clicked
$("td").on("click", eachTurn);

});