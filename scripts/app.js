
//! Simpsons themed pacman 


// !!!! Things To Do !!!! // 

//  Make a gate to stop the aliens from going back in the lair //! Nearly done but need to fix the code
// Fix the Aliens, you know what you have to do
// incorporate ready 
// Incorporate a you win in the game in innerhtml 
//  When aliens get caught whilst scared add 200 points to the total // ! DONE
// ! Incorporate lives
// * On the screen the whole time, the highest score needs to be displayed 
// * Incorporate levels innerHTML and levels that run automatically after a win 
// * the number of fruits(beer) collected, make the beer random every 1 minute intervals, set the beer points to be 300 each
// * install the A* Algorithm from your other file, and install the nodes in the game
// * Make sure the amount of lives is displayed all the time. 

// Aesthetics // 

// * Add audio files
// * Add Media Queries


// Fix the bugs //

// refactor code //
//* add code in functions 



function init() {

  // * Variables
  const grid = document.querySelector('.grid')
  const homer = document.querySelector('.homer')
  const highScore = document.querySelector('.highScore')
  const levels = document.querySelector('.level')
  
  let points = 0
  let otherPoints = 0
  let highscore = 0
  let youLose = false
  const levelScore = document.querySelector('.levelScore')
  const lives = 2
  let keyPressed = false
  let flashTheScreen = null
  let level = 1
  
  
  const width = 20 /* 10 */
  const cellCount = width * width
  const cells = [] 

  // ! Create Grid Layout
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

  // 5 for the gate
  
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
      }
    }
    addHomer(startingPosition)
    levels.innerHTML = level
  }
  createGrid(homerPosition)

  const walls = document.querySelectorAll('.wall')
  // console.log(walls)


  // ! Add homer to grid 
  function addHomer(position) {
    cells[position].classList.add(homerClass) 
  }

  // ! Remove homer from the grid
  function removeHomer(position) {
    cells[position].classList.remove(homerClass)
  }

  // * Move homer

  let timerIdTurnRight
  let timerIdTurnLeft
  let timerIdGoUp
  let timerIdGoDown 

  function handleKeyUp(event) {
    removeHomer(homerPosition)
  
    const horizontalPosition = homerPosition % width
    const verticalPosition = Math.floor(homerPosition / width)

    if (event.keyCode === 39) {
      clearInterval(timerIdTurnLeft)
      clearInterval(timerIdGoUp)
      clearInterval(timerIdGoDown)      
      if (timerIdTurnRight) {
        clearInterval(timerIdTurnRight)
      } 
      timerIdTurnRight = setInterval(turnRight, 200)
    } else if (event.keyCode === 37) {
      clearInterval(timerIdTurnRight)
      clearInterval(timerIdGoDown)
      clearInterval(timerIdGoUp)
      if (timerIdTurnLeft) {
        clearInterval(timerIdTurnLeft)
      } 
      timerIdTurnLeft = setInterval(turnLeft, 200)
    } else if (event.keyCode === 38) {
      clearInterval(timerIdGoDown)
      clearInterval(timerIdTurnRight)
      clearInterval(timerIdTurnLeft)
      if (timerIdGoUp) {
        clearInterval(timerIdGoUp)
      } 
      timerIdGoUp = setInterval(goUp, 200)
    } else if (event.keyCode === 40) {
      clearInterval(timerIdTurnLeft)
      clearInterval(timerIdTurnRight)
      clearInterval(timerIdGoUp)
      if (timerIdGoDown) {
        clearInterval(timerIdGoDown)
      } 
      timerIdGoDown = setInterval(goDown, 200)
    }

    console.log(event.keyCode)


    function turnRight() {
      if (horizontalPosition < width - 1 && !cells[homerPosition + 1].classList.contains('wall')) {
        clearInterval(timerIdTurnLeft)
        clearInterval(timerIdGoUp)
        clearInterval(timerIdGoDown)

        removeHomer(homerPosition)
        homerPosition++
        addHomer(homerPosition)

        eatDonuts()
      }

      if (homerPosition === 219) {
        eatDonuts()
        removeHomer(homerPosition)
        homerPosition = 200
        eatDonuts()
      }
    }

    function turnLeft() {
      if (horizontalPosition > 0 && !cells[homerPosition - 1].classList.contains('wall')) {
        clearInterval(timerIdTurnRight)
        clearInterval(timerIdGoDown)
        clearInterval(timerIdGoUp)

        removeHomer(homerPosition)
        homerPosition--
        addHomer(homerPosition)

        eatDonuts()
      }

      if (homerPosition === 200) {
        eatDonuts()
        removeHomer(homerPosition)
        homerPosition = 219
        eatDonuts()
      }
    }

    function goUp() {
      if (verticalPosition > 0 && !cells[homerPosition - 20].classList.contains('wall')) {

        clearInterval(timerIdGoDown)
        clearInterval(timerIdTurnRight)
        clearInterval(timerIdTurnLeft)

        removeHomer(homerPosition)
        homerPosition -= width
        addHomer(homerPosition)

        eatDonuts()
      }
    }

    function goDown() {
      if (verticalPosition < width - 1) { 
        if (!cells[homerPosition + 20].classList.contains('wall') && !cells[homerPosition + 20].classList.contains('alienLair')) {

          clearInterval(timerIdTurnLeft)
          clearInterval(timerIdTurnRight)
          clearInterval(timerIdGoUp)

          removeHomer(homerPosition)
          homerPosition += width
          addHomer(homerPosition)

          eatDonuts()
        } 
      }  
    }


    if (cells[homerPosition].classList.contains('superDonuts')) {
      aliens.forEach(alien => {
        alien.isScared = true
        console.log(alien)
        cells[homerPosition].classList.remove('superDonuts')
      })
      points = points + 100
    }
    

    // if (cells[homerPosition].classList.contains('alien')) {
    //   console.log('alien has got you')
    //   youLose = true
    //   youLost()
    // } 

    function eatDonuts() {
      if (cells[homerPosition].classList.contains('donuts')) {
        cells[homerPosition].classList.remove('donuts')
        points = points + 20
        levelScore.innerHTML = points
        checkIfPointsToWinReached()
      }
    }
     
    // console.log(points)
    function checkIfPointsToWinReached() {
      if (points === 3600) {
        console.log('You Win!')
        aliens.forEach(alien => {
          clearInterval(alien.timerId)
        })
        youWin()
      }
    }

    // console.log(points)

    addHomer(homerPosition)
  }

  //!! Next section
  

  class alien {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }

  const aliens = [
    new alien('greenAlien', 189, 250), /* 250 */
    new alien('blueAlien', 209, 400), /* 400 */
    new alien('orangeAlien', 192, 250), /* 250 */
    new alien('redAlien', 212, 250) /* 250 */
  ]


  aliens.forEach(alien => {
    cells[alien.currentIndex].classList.add(alien.className)
    cells[alien.currentIndex].classList.add('alien') 
  })



  setTimeout(alienAtStart, 3000) /* 3000 */

  cells[248].classList.add('ready')
  cells[248].classList.remove('donuts')
  cells[248].innerHTML = 'R'
  cells[249].classList.add('ready')
  cells[249].classList.remove('donuts')
  cells[249].innerHTML = 'E'
  cells[250].classList.add('ready')
  cells[250].classList.remove('donuts')
  cells[250].innerHTML = 'A'
  cells[251].classList.add('ready')
  cells[251].classList.remove('donuts')
  cells[251].innerHTML = 'D'
  cells[252].classList.add('ready')
  cells[252].classList.remove('donuts')
  cells[252].innerHTML = 'Y'
  cells[253].classList.add('ready')
  cells[253].classList.remove('donuts')
  cells[253].innerHTML = '!'

  function alienAtStart() {
    
    aliens.forEach(alien => {
      cells[248].classList.remove('ready')
      cells[248].classList.add('donuts')
      cells[248].innerHTML = ''
      cells[249].classList.remove('ready')
      cells[249].classList.add('donuts')
      cells[249].innerHTML = ''
      cells[250].classList.remove('ready')
      cells[250].classList.add('donuts')
      cells[250].innerHTML = ''
      cells[251].classList.remove('ready')
      cells[251].classList.add('donuts')
      cells[251].innerHTML = ''
      cells[252].classList.remove('ready')
      cells[252].classList.add('donuts')
      cells[252].innerHTML = ''
      cells[253].classList.remove('ready')
      cells[253].classList.add('donuts')
      cells[253].innerHTML = ''
      movealien(alien)
    })
  }

  function movealien(alien) {

    const routes = [-1, +1, width, -width] //routes of the alien 
    let route = routes[Math.floor(Math.random() * routes.length)] //random generator 

  

    alien.timerId = setInterval(() => {

      

      // if (!cells[alien.currentIndex - width].classList.contains('gate')) {
      //   cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
      //   alien.currentIndex = alien.currentIndex + route
      //   cells[alien.currentIndex].classList.add(alien.className, 'alien')
      // }
      
      if (!cells[alien.currentIndex + route].classList.contains('wall') && !cells[alien.currentIndex + route].classList.contains('alien')) {
        if (!cells[alien.currentIndex + width].classList.contains('gate')) {
          cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
          alien.currentIndex = alien.currentIndex + route
          cells[alien.currentIndex].classList.add(alien.className, 'alien')
        } else {
          cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
          alien.currentIndex = alien.currentIndex + route
          cells[alien.currentIndex].classList.add(alien.className, 'alien')
        } 
      } else {
        route = routes[Math.floor(Math.random() * routes.length)]
      } 

      
      if (alien.isScared) {
        cells[alien.currentIndex].classList.add('scared-alien')
        setTimeout(alienToNormal, 20000)
      }



      if (cells[homerPosition].classList.contains('alien') && alien.isScared) {
        //aliens.forEach(alien => {
        otherPoints = otherPoints + 200
        console.log('otherpoints', otherPoints)
        cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
        alien.currentIndex = alien.startIndex
        cells[alien.currentIndex].classList.add(alien.className, 'alien') 
        //})
      } //else if (cells[alien.currentIndex].classList.contains(homerClass) && alien.isScared) {
      //   //aliens.forEach(alien => {
      //     cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
      //     alien.currentIndex = alien.startIndex
      //     cells[alien.currentIndex].classList.add(alien.className, 'alien')
      //  //})
      // }  
      
    

      function alienToNormal() {
        cells[alien.currentIndex].classList.remove('scared-alien')
        alien.isScared = false
      }


      if (cells[alien.currentIndex].classList.contains(homerClass)) {
        console.log('alien has got you')
        youLose = true
        youLost()
      } 

    }, 3000) //alien.speed

    

  }



  // check for a win


  function youLost() {
    console.log('You lose!')

    aliens.forEach(alien => {
      clearInterval(alien.timerId)
    })
    document.removeEventListener('keyup', handleKeyUp)  

    cells[246].classList.remove('donuts')
    cells[246].classList.add('tester')
    cells[246].innerHTML = 'G'

    cells[247].classList.add('tester')
    cells[247].classList.remove('donuts')
    cells[247].innerHTML = 'A'

    cells[248].classList.add('tester')
    cells[248].classList.remove('donuts')
    cells[248].innerHTML = 'M'

    cells[249].classList.add('tester')
    cells[249].classList.remove('donuts')
    cells[249].innerHTML = 'E'

    cells[250].classList.add('tester')
    cells[250].classList.remove('donuts')

    cells[251].classList.add('tester')
    cells[251].classList.remove('donuts')
    cells[251].innerHTML = 'O'

    cells[252].classList.add('tester')
    cells[252].classList.remove('donuts')
    cells[252].innerHTML = 'V'

    cells[253].classList.add('tester')
    cells[253].classList.remove('donuts')
    cells[253].innerHTML = 'E'

    cells[254].classList.add('tester')
    cells[254].classList.remove('donuts')
    cells[254].innerHTML = 'R'

    // const tester = document.querySelector('.tester')
    // tester.innerHTML = 'G'

    console.log(cells[246])
  }

  function youWin() {
    cells[247].classList.add('tester')
    cells[247].innerHTML = 'Y'
    cells[248].classList.add('tester')
    cells[248].innerHTML = 'O'
    cells[249].classList.add('tester')
    cells[249].innerHTML = 'U'

    cells[251].classList.add('tester')
    cells[251].innerHTML = 'W'
    cells[252].classList.add('tester')
    cells[252].innerHTML = 'I'
    cells[253].classList.add('tester')
    cells[253].innerHTML = 'N'
    cells[254].classList.add('tester')
    cells[254].innerHTML = '!'

    aliens.forEach(alien => {
      clearInterval(alien.timerId)
    })
    document.removeEventListener('keyup', handleKeyUp)  
    clearInterval(timerIdGoDown)
    clearInterval(timerIdGoUp)
    clearInterval(timerIdTurnRight)
    clearInterval(timerIdTurnLeft)
    flashTheScreen = setInterval(flashScreen, 750)

    //proceed to the next level 
    //make ghosts slightly faster 
  }

  function flashScreen() {
    setTimeout(switchToRed, 500)
    function switchToRed() {
      walls.forEach(wall => {
        wall.style.backgroundColor = 'red'
      })
    }

    setTimeout(switchToBlue, 1000)
    function switchToBlue() {
      walls.forEach(wall => {
        wall.style.backgroundColor = 'blue'
      })
    }

    setTimeout(switchToRedAgain, 1500)
    function switchToRedAgain() {
      walls.forEach(wall => {
        wall.style.backgroundColor = 'red'
      })
    }

    setTimeout(switchToBlueAgain, 2000)
    function switchToBlueAgain() {
      walls.forEach(wall => {
        wall.style.backgroundColor = '#fed90f'
      })
    }

    clearInterval(flashTheScreen)

    
    newLevel()
  }
  
  

  function newLevel() {
    level = level + 1
    // innerHTML the level
    console.log(level)
    aliens.forEach(alien => {
      alien.speed = alien.speed - 20
      // movealien(alien)
      
    })
    document.addEventListener('keyup', handleKeyUp)

    cells[247].classList.remove('tester')
    cells[247].innerHTML = ''
    cells[248].classList.remove('tester')
    cells[248].innerHTML = ''
    cells[249].classList.remove('tester')
    cells[249].innerHTML = ''

    cells[251].classList.remove('tester')
    cells[251].innerHTML = ''
    cells[252].classList.remove('tester')
    cells[252].innerHTML = ''
    cells[253].classList.remove('tester')
    cells[253].innerHTML = ''
    cells[254].classList.remove('tester')
    cells[254].innerHTML = ''

    // aliens.forEach(alien => {
    //   
    //   cells[alien.startIndex].classList.add(alien.className, 'alien')
    // })

    // removeHomer(homerPosition)

    cells[homerPosition].classList.remove(homerClass)

    homerPosition = 310

    cells[homerPosition].classList.add(homerClass)

    aliens.forEach(alien => {
      cells[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
      alien.currentIndex = alien.startIndex
      cells[alien.startIndex].classList.add(alien.className, 'alien', 'scared-alien')
      movealien(alien)
    })



    //remove scared alien 
    //put the character back in the lair
    //put homer back in the starting position



    //add donuts and super donuts
    highscore = highscore + points
    highScore.innerHTML = highscore
    points = 0 
    levelScore.innerHTML = points
    level = (level + 1) - 1 //not sure why I had to do this formula but it kept adding it by two with just level = level + 1
    levels.innerHTML = level 
    createGrid()
    // reset the score again 
     
    //add ready too 

  }
  

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp) /* keyup */


}

window.addEventListener('DOMContentLoaded', init)
