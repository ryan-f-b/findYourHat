const prompt = require('prompt-sync')({sigint: true});

// Assigning variables for characters used in the game
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.x_pos = 0;
    this.y_pos = 0;
    this.direction = null;
  }

  // When called, this method clears the console and then prints the current grid
  print() {
    process.stdout.write('\x1Bc');
    for (let row of this.field) {
      console.log(row.join(''));
    } 
  }

  // Method to handle moving the pathCharacter
  move() {
    switch (this.direction.toUpperCase()) {
      case 'R':
        if (this.x_pos + 1 === this.field[0].length) {
          this.playGame('Cannot move further right. Please enter another command.');
          break;
        } else if (this.field[this.y_pos][this.x_pos + 1] === hole) {
          console.log("You fell down a hole! Wounded! Game over!");
          return;
        } else if (this.field[this.y_pos][this.x_pos + 1] === hat) {
          console.log("You've found the hat! You win!");
          return;
        } else {
          this.x_pos += 1;
          this.field[this.y_pos][this.x_pos] = pathCharacter;
          this.playGame();
          break;
        }

      case 'L':
        if (this.x_pos === 0) {
          console.log('Cannot move any further left');
          this.playGame('Cannot move further left. Please enter another command.');
          break;
        } else if (this.field[this.y_pos][this.x_pos - 1] === hole) {
          console.log("You fell down a hole! Wounded! Game over!");
          return;
        } else if (this.field[this.y_pos][this.x_pos - 1] === hat) {
          console.log("You've found the hat! You win!");
          return;
        } else {
          this.x_pos -= 1;
          this.field[this.y_pos][this.x_pos] = pathCharacter;
          this.playGame();
          break;
        }

      case 'U':
        if (this.y_pos === 0) {
          this.playGame('Cannot move further up. Please enter another command.');
          break;
        } else if (this.field[this.y_pos - 1][this.x_pos] === hole) {
          console.log("You fell down a hole! Wounded! Game over!");
          return;
        } else if (this.field[this.y_pos - 1][this.x_pos] === hat) {
          console.log("You've found the hat! You win!");
          return;
        } else {
          this.y_pos -= 1;
          this.field[this.y_pos][this.x_pos] = pathCharacter;
          this.playGame();
          break;
        }

      case 'D':
        if (this.y_pos === this.field.length - 1) {
          this.playGame('Cannot move further down. Please enter another command.');
          break;
        } else if (this.field[this.y_pos + 1][this.x_pos] === hole) {
          console.log("You fell down a hole! Wounded! Game over!");
          return;
        } else if (this.field[this.y_pos + 1][this.x_pos] === hat) {
          console.log("You've found the hat! You win!");
          return;
        } else {
          this.y_pos += 1;
          this.field[this.y_pos][this.x_pos] = pathCharacter;
          this.playGame();
          break;
        }

      case 'QUIT':
        console.log('You quit the game! Wimp!');
        return;
      
      default:
        this.playGame('Please enter a valid move!');
        break;
    }
  }

  // Method called at the start of the game and after each move
  playGame(errMessage) {
    this.print();
    if (errMessage) {
      console.log(errMessage);
    }
    this.direction = prompt("Which way do you want to move? Enter U, D, L or R: ");
    this.direction.toUpperCase();
    this.move();
  }

  // Static method used to generate a field based on the inputted parameters, including a percentage which determines what % of the grid is holes
  static generateField(height, width, percentage) {
    let field = [];

    // Creating a new array for each row
    for (let i = 0; i < height; i++) {
      field.push([]);


      for (let j = 0; j < width; j++) {
        
        // Ensuring the top left of the grid is assigned as the path character
        if (i === 0 && j === 0) {
          field[i].push(pathCharacter);

        // Randomly assigning holes based on the percentage parameter
        } else if (Math.floor(Math.random() * 100) < percentage) {
          field[i].push(hole);

        // Filling the remaining grid areas with fieldCharacters
        } else {
          field[i].push(fieldCharacter);
        }
      }
    }

    // Randomly assigning one area of the grid as the hat
    let rand1 = Math.floor(Math.random() * height);
    let rand2 = Math.floor(Math.random() * width);
    if (rand1 !== 0 || rand2 !== 0) {
     field[rand1][rand2] = hat;
    }
    return field;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

const randomField = Field.generateField(5, 5, 25);
const newField = new Field(randomField);

newField.playGame();