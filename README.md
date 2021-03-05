# Project 1: Pacman (Homerman)

## Index

* [Overview](#overview)
* [Brief](#brief)
* [Technologies](#technologies)
* [Winning](#winning)
* [Movement](#movement)
* [Layout](#layout)
* [Items and Points](#items-and-points)
* [Styling](#styling)
* [The Villains](#villains)
* [Collision Detection](#collision-detection)
* [Conclusion](#conclusion)

## Overview

For the first project of the Software Engineering Course at General Assembly, we were tasked to make a game in just under one week using vanilla javascript: HTML, CSS and JavaScript. General Assembly gave us a list of games to choose from, and I chose the well-known, arcade game, Pac-Man. 

In the original game, the player controls the character pac-man in an encolsed maze. The aim of the game is to consume all of the pellets in the maze whilst avoding the four coloured ghosts - Blinky, Pinky, Inky, and Clyde that try to capture him. Only when all the pellets are consumed does the player then advance to the next level. 

For the pac-man I created, I decided not to explicitly re-make the original, but re-create some of it using some of its concepts and reasoning. The theme of my game originates from the well-known cartoon, animation, The Simpsons. 

## Brief

- A player must be able to advance to the next level by clearing the board.
- Each level should get progressively harder. 
- Each player should be able to see their level score, and their highest score. 

## Technologies

- HTML5 with HTML5 audio
- CSS3 with animation
- JavaScript (ES6)
- Git
- GitHub
- Google Fonts
- Google Chrome dev tools
- VS Code

## Winning

Like the original pacman, the game goes on forever until the player eventually runs out of lives by being captured by the simpson villains. To progress from each level to level, a player must collect all the pink donuts of the level they are currently at. They will then progress to the next level. Each Level starts with the villains located in their lair, and homer in the starting position in the grid. As the player progresses from level to level the villains get faster. A player has two lives, a player cannot regain them. The score is located at the top left of the screen. The highest score is the highest score a player is able to obtain out of all the games he/she has played. 

## Movement

The human player can move in 4 directions: up, down, left and right. These events are triggered by the keyboard arrows. Once a key is pressed, the image of homer is removed, and then added. Therefore, homer, can only ever be in a horizontal, or diagonal position. Everytime a player hits a new arrow key, all the other time intervals of the other keys are cleared to prevent intervals from clashing. To avoid a player hitting the same direction key more than once, causing multiple intervals to be created, I have programmed it to make sure that events of the same direction cannot create multiple intervals. 

Using intervals made it less tiring for the player having to repeatedly click arrow keys to move homer. Essentially every time an arrow key is hit, homer is removed and then added to the next cell depending on the direction. This only stops until a player presses a new arrow key. 

To ease the transition between each cell, and to prevent a lagging type of motion, two things are required: the speed of the player, animation trasition between cell to cell. The first is easy to achieve by increasing the speed; whereas, the second, requires a play with css animation: uses a combination of scale, rotation and translating. Every time a player presses an arrow key a class representing the direction, example, "down" is added, this allows the movement to smoothen. 

```
.down {
  animation: smoothMoveDown 0.22s;
  animation-direction: normal;
  
}

@keyframes smoothMoveDown {
  0% {
    transform: rotate(90deg) scale(1, 1) translateX(-20px);
    
  }

  100% {
    transform: rotate(90deg) scale(1, 1) translateX(0px);
  
  }
}
```

## Layout

<p align="center">
  <img src="images/homerman_grid.png" width="425"/>
</p>

The number of squares in the grid was 20 X 20 cells. Avoiding having to manually hard-code each cell with a class, which would have taken 400 lines of code, I decided to create an array, gridLayout, of which holds 5 unique numbers: "8" refers to the class of "wall", "4" refers to the class of "donuts", 0 refers to the classlist of "superDonuts", "2" refers to "alienLair" (aliens/villains lair), "5" refers to gate (the gate of the alien lair). The grid was then created using this gridLayout array, using the following code:

```
  const gridLayout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4,1,
    1,8,1,1,8,1,1,1,1,1,8,1,1,1,1,8,1,1,8,1,
    1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,
    1,8,1,1,8,1,8,1,1,1,1,1,1,8,1,8,1,1,8,1,
    1,8,8,8,8,1,8,8,8,8,1,8,8,8,1,8,8,8,8,1,
    1,1,1,1,8,1,1,1,1,8,1,8,1,1,1,8,1,1,1,1,
    1,1,1,1,8,1,8,8,8,8,8,8,8,8,8,8,1,1,1,1,
    1,1,1,1,8,1,8,1,1,5,5,5,5,1,1,8,1,1,1,1,
    1,1,1,1,8,1,8,1,1,2,2,2,2,1,1,8,1,1,1,1,
    8,8,8,8,8,1,8,1,1,2,2,2,2,1,1,8,8,8,8,8,
    1,1,1,1,8,1,8,1,1,1,1,1,1,1,1,8,1,1,1,1,
    1,1,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1,1,1,1,
    1,1,1,1,8,1,1,1,1,1,8,1,1,1,1,8,1,1,1,1,
    1,8,8,8,8,8,8,8,8,8,8,1,1,1,1,8,1,1,1,1,
    1,8,1,1,8,1,1,1,1,1,8,8,8,8,8,8,8,8,8,1,
    1,8,1,1,8,1,8,8,8,1,8,1,1,1,8,1,1,1,8,1,
    1,8,1,1,8,1,8,1,8,1,8,1,1,1,8,1,1,1,8,1,
    1,4,8,8,8,8,8,8,8,8,8,1,1,1,8,8,8,8,4,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  ```

  ```
  
  const homerClass = 'homer'
  let homerPosition = 310 /* 310 */

  // ! Create Grid with the grid layout
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = null/* i */
      grid.appendChild(cell)
      cells.push(cell)
      cell.dataset.id = i
      
      if (gridLayout[i] === 1) {
        cells[i].classList.add('wall')
      } else if (gridLayout[i] === 8) {
        cells[i].classList.add('donuts')
      } else if (gridLayout[i] === 4) {
        cells[i].classList.add('superDonuts')
      } else if (gridLayout[i] === 0) {
        cells[i].style.backgroundColor = 'white'
      } else if (gridLayout[i] === 2) {
        cells[i].classList.add('alienLair')
      } else if (gridLayout[i] === 5) {
        cells[i].classList.add('gate')
        cells[i].classList.add('alienLair')
      }
    }
    addHomer(startingPosition)
    levels.innerHTML = level
  }
  createGrid(homerPosition)

```

With the above code, for every number of the cellCount, which totals 400, a cell is created and appended to a div container, "grid". This cell is then pushed to an array of cells. The gridLayout array is then compared to the cells array: If gridLayout[i] equalts to any of the 5 uniqiue numbers, the cells[i] would select a cell of the number i and add the appropriate class. 

## Items and Points

<ins>Donuts & Super Donuts</ins>

There are two types of donuts in the game: Pink, strawberry donuts and Green, big donuts: pink donuts add 20 points to your score: whereas, green donuts add 0 points to your score. 

Green donuts are responsible for turning the homer villains into aliens for 5 seconds: the aliens are in a scared state which allows you to destroy them, returning them back to their lair. 

<ins>Beers</ins>

For every level, a beer would appear randomly in 4 locations, consuming this beer will give you 520 points. 

## Styling

To break away from the original, I decided to theme this version of pacman simpson themed. All items, are in the Simpsons cartoons, the famous duff beer, pink and green donuts. The player's character is Homer simpson himself. The villains trying to capture Homer are the Simpson Villains: Mr Burns, Moe, Nelson, Sideshow Bob. The aliens, after Homer eats a green donut, also exist in the Simpsons. 

## Villains

Villians move in a similar way to the previous mentioned, "movement". Originally, I ran out of time to add the AI required to the villians, so they all initially, during scared, and unscared states, moved randomly. Just after the end of the project, I added the AI required on the villains. They are in three states, scared, unscared and scatter. 

To get in the scared state, Homer has to consume the green donut. The latter turns them into aliens, which allows them to be captured. Once captured, they return back to their lair giving the player, homer, a few seconds of breathing space to clear the board and proceed to the next level. This scared state is timed to cancel after 5 seconds, to avoid the superpower from being too overpowering. 

When the villians are not chasing, they are in a scatter state. They occupy and patrol the four corners of the grid, if they are not in chase-mode.

Once Homer (Pac-Man) enters an area/zone that they are guarding, the villains go into "chase" mode, this is the mode where the villains chase pacman, given pacman's location. 

When moving, the villains take into consideration the boundaries that they cannot infiltrate: The walls, each-other. This essentially stops them from colliding into each-other and going through obstacles they're not supposed to go through. 

## Collision Detection

Collision detection is not as complicated: it is a simple play on classes. If both a villain class and a homer class are present in the same cell during a villain's chase state homer simpson loses a life. Alternateively, if the villain is in a scared state, and both classes are in the same cell, the ghosts die and are transported to the lair. 

## Conclusion 

<ins>Wins & Challenges</ins>

- It was great working with Vanilla, and getting comfortable working with the DOM. 
- The biggest challenge would have to be adding the different behaviours to the villains: I was not able to complete it during the time-frame, but managed to complete the two days after the project. 

<ins>Key Learnings</ins>

- Making sure the movement was a smooth as possible by using CSS animation, and player speed. 
- I gained great experience playing around with time intervals. 








