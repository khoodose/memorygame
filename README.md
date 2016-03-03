# Memory Game

Hi there.  This is my first project for the General Assembly WDI in Singapore.  I have chosen to do a memory game, partly because of my interest in recreating board games and strategy games, and partly because I have recent memories of having to play this in Escape Rooms with my friends.  I envision this as a fun "girls vs guys" parlor game, partly because in my social group, the girls often fervently advocate for that (e.g. in frisbee or board games).

### Technologies Used

I used HTML, CSS, JavaScript and jQuery.

### Approach Taken

* A grid of table rows is drawn up as tiles
* An array of 12 different pairs of objects is created and randomized to populate the board, so the objects under the grid are different each game.
* There is a separate set of objects for the "dude" vs "girl" modes.
* To switch modes, a button in the top left is clicked, and this changes the skin (stylesheet) of the page, tracks the score separately, and populates the tiles with the suitable items.
* Scoring is tracked by the number of attempted matches.  So successful and unsuccessful matches all count.
* After the second player has completed the grid, the scores are compared and an alert message informs the players of the winner and the score differential (or a draw with the number of moves taken).

### Usage Instructions

* Go nuts.

### Unsolved Problems

* I'd like to fix the status bar and display of scores.
* I'd like to include a time element for the score, or perhaps set a maximum time, after which that player or side has timed out and "lost".  Or that may lead to a cricket-style scoring system?
* Right now scores are tracked based on which stylesheet or skin you're on, creating the effect of having turns.  If you wanted to play beyond 2 turns that needs to be fixed.
* Right now you can go back and have a mulligan for player 1 if you really really choose to (by clicking switch roles) but you can't do that for player 2 as the game will have ended.

