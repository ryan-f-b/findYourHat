const prompt = require('prompt-sync')({sigint: true});

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

  print() {
    process.stdout.write('\x1Bc');
    for (let row of this.field) {
      console.log(row.join(''));
    } 
  }

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

  playGame(errMessage) {
    this.print();
    if (errMessage) {
      console.log(errMessage);
    }
    this.direction = prompt("Which way do you want to move? Enter U, D, L or R: ");
    this.direction.toUpperCase();
    this.move();
  }

  static generateField(height, width, percentage) {
    let field = [];
    for (let i = 0; i < height; i++) {
      field.push([]);
      for (let j = 0; j < width; j++) {
        if (i === 0 && j === 0) {
          field[i].push(pathCharacter);
        } else if (Math.floor(Math.random() * 100) < percentage) {
          field[i].push(hole);
        } else {
          field[i].push(fieldCharacter);
        }
      }
    }
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