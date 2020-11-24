
//! Simpsons themed pacman 


// !!!! Things To Do !!!! // 

// * Make a gate to stop the aliens from going back in the lair
//  When aliens get caught whilst scared add 200 points to the total // ! DONE
// * when the unscared alien catches homer display a lost life, game over needs to be displayed on the screen after three lives lost 
// * On the screen the whole time, the highest score needs to be displayed 
// * 1UP the number of points in the game session needs to be saved 
// * the number of fruits(beer) collected, make the beer random every 1 minute intervals, set the beer points to be 300 each
// * install the A* Algorithm from your other file, and install the nodes in the game
// * Make sure the amount of lives is displayed all the time. 
// * Add ready innerHTML before the game is played 
// * flash the screen after winning. 
// * use time intervals so that homer keeps moving despite only one arrow pressed --> Just like Snake 
// Aesthetics // 
//* CSS into a simpsons theme 
// * Add audio files

// Fix the bugs //

// refactor code //
//* add code in functions 



function init() {

  // * Variables
  const grid = document.querySelector('.grid')
  const homer = document.querySelector('.homer')
  let points = 0
  let otherPoints = 0
  let youLose = false
  
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
  let homerPosition = 310

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
  }
  createGrid(homerPosition)

  // ! Add homer to grid 
  function addHomer(position) {
    cells[position].classList.add(homerClass) 
  }

  // ! Remove homer from the grid
  function removeHomer(position) {
    cells[position].classList.remove(homerClass)
  }

  // * Move homer
  function handleKeyUp(event) {
    removeHomer(homerPosition)
  
    const horizontalPosition = homerPosition % width
    const verticalPosition = Math.floor(homerPosition / width)
    

    if (event.keyCode === 39) { //turn right
      if (horizontalPosition < width - 1 && !cells[homerPosition + 1].classList.contains('wall')) {
        homerPosition++
      }

      if (homerPosition === 219) {
        homerPosition = 200
      }
    } else if (event.keyCode === 37) { //turn left
      if (horizontalPosition > 0 && !cells[homerPosition - 1].classList.contains('wall')) {
        homerPosition--
      }

      if (homerPosition === 200) {
        homerPosition = 219
      }
    } else if (event.keyCode === 38) { //go up
      if (verticalPosition > 0 && !cells[homerPosition - 20].classList.contains('wall')) {
        homerPosition -= width
      }
    } else if (event.keyCode === 40) {
      if (verticalPosition < width - 1) { // go down 
        if (!cells[homerPosition + 20].classList.contains('wall') && !cells[homerPosition + 20].classList.contains('alienLair')) {
          homerPosition += width
        } 
      }  
    } else {
      console.log('Please use the arrows on your keyboard')
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

    if (cells[homerPosition].classList.contains('donuts')) {
      cells[homerPosition].classList.remove('donuts')
      points = points + 20
    }
     
    // console.log(points)
    if (points === 3600) {
      console.log('You Win!')
      aliens.forEach(alien => {
        clearInterval(alien.timerId)
      })
    }

    // console.log(points)

    addHomer(homerPosition)
  }

  

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
    new alien('greenAlien', 189, 250),
    new alien('blueAlien', 209, 400),
    new alien('orangeAlien', 192, 250),
    new alien('redAlien', 212, 250)
  ]


  aliens.forEach(alien => {
    cells[alien.currentIndex].classList.add(alien.className)
    cells[alien.currentIndex].classList.add('alien') 
  })

  aliens.forEach(alien => {
    movealien(alien)
  })

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

    }, alien.speed) //alien.speed

    

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
  
  

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp) /* keyup */


}

window.addEventListener('DOMContentLoaded', init)
