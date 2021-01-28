// document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    document.querySelector('.score').innerHTML = "Score: " + score;

    const candyColors = [
        'url(./img/1.png)',
        'url(./img/2.png)',
        'url(./img/3.png)',
        'url(./img/4.png)',
        'url(./img/5.png)',
        'url(./img/6.png)'
        
    ]

    // RELOAD PAGE
    function reloadPage () {
        location.reload();
    }

    // UPDATE SCORE
    function updateScore() {
        document.querySelector('.score').innerHTML = "Score: " + score;   
        if (score >= 50) {
            youWon();
            }     
    }

    function youWon() {
        // console.log("Du vann!!");
        // document.querySelector('.score').innerHTML = "Du vann!"; 
        alert("you won!")
        // console.log(score)
    }

    // updateScore();
    

    // CREATE BOARD
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();

    // DRAG THE CANDIES
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id)
    }

    
    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
    }
    
    
    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        return colorBeingReplaced;

    }
    
    function dragEnd(e) {
        // this.style.backgroundImage = colorBeingReplaced;
        let replacedColor = e.target.style.backgroundImage;
        // console.log(colorBeingDragged);
        // console.log(replacedColor);

        // what is a valid move?
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged - width,
            squareIdBeingDragged +1,
            squareIdBeingDragged + width
        ]
        
        let validMove = validMoves.includes(squareIdBeingReplaced);
       // FRÅN GIT
       if (squareIdBeingReplaced && validMove) {
        let scoredRowOfFive = checkRowForFive();
        let scoredColumnOfFive = checkColumnForFive();
        let scoredRowOfFour = checkRowForFour();
        let scoredColumnOfFour = checkColumnForFour();
        let scoredRowOfThree = checkRowForThree();
        let scoredColumnOfThree = checkColumnForThree();
        //check if any combo was scored
        if(scoredRowOfFive || scoredColumnOfFive || scoredRowOfFour || scoredColumnOfFour || scoredRowOfThree || scoredColumnOfThree){
          squareIdBeingReplaced = null;
        }
        //if no combo scored swap back to original candies
        else if(!scoredRowOfFive && !scoredColumnOfFive && !scoredRowOfFour && !scoredColumnOfFour && !scoredRowOfThree && !scoredColumnOfThree){
          squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
          squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        }
      }  else if (squareIdBeingReplaced && !validMove) {
         squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
         squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged

    //    CORRES KOD
        // // console.log(squareIdBeingReplaced);
        // if (replacedColor != colorBeingDragged) {
        //     console.log("fel färg")
        // }
        // if (squareIdBeingReplaced && validMove) {
        //     squareIdBeingReplaced = null; 
        // } else if (squareIdBeingReplaced && !validMove) {
        //     squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        //     squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        // } else {
        //     squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        // }
    }

    // drop candies once some have been cleared
console.log(squares)
    function moveDown() {
        for (i = 0; i <= 55; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === "") {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }

    // moveDown();

    // CHECKING FOR MATCHES
    // checking for row of 5
    function checkRowForFive() {
        for (i = 0; i <= 60; i++) {
            let rowOfFive = [i, i + 1, i + 2, i+3, i+4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
            updateScore();
            return true;
            }
        }
        return false;
    }



    // check for column of 5
    function checkColumnForFive() {
        for (i = 0; i <= 31; i++) {
            let columnOfFive = [i, i + width, i + width*2, i + width*3, i + width*4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
            updateScore();
            return true;
            }
        }
        return false;
    }




    // checking for row of 4
    function checkRowForFour() {
        for (i = 0; i <= 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i+3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
                updateScore();
                return true;
            }
        }
        return false;
    }


    // check for column of 4
    function checkColumnForFour() {
        for (i = 0; i <= 39; i++) {
            let columnOfFour = [i, i + width, i + width*2, i + width*3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
                updateScore();
                return true;
            }
        }
        return false;
    }



    // checking for row of 3
    function checkRowForThree() {
        for (i = 0; i <= 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
                updateScore();
                return true;
            }
        }
        return false;
    }


    // check for column of 3
    function checkColumnForThree() {
        for (i = 0; i <= 47; i++) {
            let columnOfThree = [i, i + width, i + width*2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = "";
                })
                updateScore();
                return true;
            }
        }
        return false;
    }

   


     


    // window.setInterval(function () {
    //     moveDown() 
    //     checkRowForFive();  
    //     checkColumnForFive(); 
    //     checkRowForFour();  
    //     checkColumnForFour(); 
    //   checkRowForThree();  
    //   checkColumnForThree();  
    //   updateScore();
    // }, 100)

    window.setInterval(function(){
        // updateScore();
        checkRowForFive();  
        checkColumnForFive(); 
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveDown();
      }, 100);
    


// })