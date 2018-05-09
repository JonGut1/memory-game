# Memory Game

## Table of Contents

* [About](#about)
* [Mechanics](#mechanics)
* [Code](#code)
* [Dependencies](#dependencies)




## About

The project called "memory game" works by matching two cards with the same icon on there backs. When a player clicks the card, it flips and shows the hidden icon. When the player has matched all of the cards he wins the game

## Mechanics

The player is able to click the card at any time, the card is then fliped. If the two clicked cards do not match they flip again to hide the icons. If the cards do match, then they disappear and the player gets a certain amount of points.

The moves are registered as one move, after every two flips. When a certain amount of moves is reached a star will disappear and the player will lose some points.

The player can gain back the stars by successfully matching the cards a couple of times in the row. The stars at the end will be calculated and will add a certain amount of points for each star.

The player can log his name and all of his scores and time into the local browser storage. This can be done at the end of the game, when a congratulations screen is shown.

## Code

The JavaScript programming language was used for all of the logic of the game. Also a lot of elements were added into the DOM using JavaScript: such as different screens and buttons.

CSS3 was used to style the elements and make the animations of the cards.

HTML5 was ussed to add the primary elements into the DOM.

Some of the css code resposible for the card animations might have been taken from https://codepen.io/shayhowe/pen/Fvjnf. Also the code present in app.js file that is responsible for the shuffling of the cards was provided by the projects starter code and was taken from http://stackoverflow.com/a/2450976.

## Dependencies

Styles,

app.css - styles the whole page. Adjusts the font sizes, colors and position of the elements.

responsive.css - makes the page responsive for many different sized screens.

Google Fonts - styles the fonts of the text elements of the page.
Used fonts: (https://fonts.googleapis.com/css?family=Chicle", https://fonts.googleapis.com/css?family=Source+Sans+Pro).

Bootstrap - from https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css, adds icons such as card icons, stars and restart button.

supernovathemes.com - provides the backgound images for the body of the page and for the container of the games background.
Themes used: (http://supernovathemes.com/wp-content/themes/supernovathemes/images/bg/b34.png, http://supernovathemes.com/wp-content/themes/supernovathemes/images/bg/b38.png)

Game logic,

app.js - makes the page interactive. Creates the mechanics and all of the rules of the game.

Local browser storage - stores the information of the players current match such as the players chosen name also the matches score, time, moves and number of stars.