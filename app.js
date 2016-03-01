$(function(){
  console.log("page loaded and ready to go");

/*
MVP level logic

- We hardcode the "frontface" with the 12 sets of images
- Maybe have a fast randomizer?
  = This needs more thought
- Get the flipping display right
- Get a simple logic check out
- Need an array to represent the state of the grid??
  = It won't ever be empty
  = but how do we store the logic of the thing being matched and cannot flip back?
  = need a counter or state to determine if game is over (another checkwin)
  = would you change the class if it has a certain image to it?
  = maybe start with 6 pairs for a test... the checker just needs to determine that they have the same image...

- the flip () function... onclick
  = check if this tile has already been paired (some state variable... per tile)
  = if so, display some message like ("this pair is done. quick, find the others! :)")
  = if not paired and eligible for play, check pairing
  = if match, keep both displayed and lock out their states
  = if not matched, flip both back to the original state

- FUCK! Each turn is really two halves...
  = first half is to flip open an eligible tile
  = second half is to flip a second eligible tile while holding the first tile, and then execute logic

- just toggle classes between the default of no class and the new image
- the test is something like:
  = if at any one time, two tiles have the same class and this class is not the default class, then a match is found.  freeze the matched tiles as is.

*/

// helper function to test whether we've grabbed the right element
function alertTest () {
  alert("Pick me, pick me!");
}

// variable to check whether there has been a first selection
var earlierSelection = false;

var gameOver = false;

function checkEnd () {
  if ($("td").length===$("td.matched").length) {
    gameOver = true;
    alert("Winner, winner, chicken dinner!");
    location.reload();
  }
}

function eachTurn () {

  if ($(this).attr("class")==="matched") {
    alert("This one's matched. Quick, choose another!");
  }

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

    console.log(firstImage);
    console.log(secondImage);
    console.log(firstImage===secondImage);

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

console.log($("td").length);
console.log($("td.matched").length);


$("td").on("click", eachTurn);

});