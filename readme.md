🎩 Find Your Hat (Node.js Terminal Game)
========================================

A simple interactive terminal game built with Node.js as part of the Codecademy **"Find Your Hat"** project.

Navigate through a randomly generated field, avoid holes, and try to find your hat!

* * * * *

🕹️ Gameplay
------------

-   You start at the top-left corner of the field (`*`)

-   Move around using directional inputs:

    -   `U` → Up

    -   `D` → Down

    -   `L` → Left

    -   `R` → Right

-   Your goal is to find the hat (`^`)

-   Avoid holes (`O`) --- falling into one ends the game

-   You can quit anytime by typing `QUIT`

* * * * *

🧱 Field Elements
-----------------

| Symbol | Meaning |
| --- | --- |
| `*` | Player path |
| `░` | Safe ground |
| `O` | Hole (game over) |
| `^` | Hat (win) |

* * * * *

⚙️ Features
-----------

-   🎲 Random field generation

-   📏 Customisable field size and difficulty

-   🔁 Continuous gameplay loop

-   🧠 Boundary checking (prevents invalid moves)

-   ❌ Game over conditions (holes & quitting)

-   🏆 Win condition (finding the hat)

* * * * *

🚀 Getting Started
------------------

### 1\. Clone the repository

```
git clone https://github.com/your-username/find-your-hat.git
cd find-your-hat

```

### 2\. Install dependencies

This project uses `prompt-sync` for user input:

```
npm install prompt-sync

```

### 3\. Run the game

```
node main.js

```

* * * * *

🎮 Example
----------

```
*░O
░O░
░^░

Which way do you want to move? Enter U, D, L or R:

```

* * * * *

🧩 How It Works
---------------

### `Field` Class

The game logic is encapsulated in a `Field` class:

-   **Constructor**

    -   Tracks the field grid and player position

-   **print()**

    -   Clears the console and displays the current field

-   **move()**

    -   Handles player movement

    -   Checks for:

        -   Boundaries

        -   Holes (loss)

        -   Hat (win)

-   **playGame()**

    -   Main game loop

    -   Prompts user input and updates state

-   **generateField(height, width, percentage)**

    -   Creates a random field

    -   `percentage` controls how many holes appear

* * * * *

🎯 Customisation
----------------

You can tweak difficulty by changing:

```
const randomField = Field.generateField(5, 5, 25);

```

-   `5, 5` → Field size (height x width)

-   `25` → Percentage chance of holes

Try:

-   Larger fields for longer games

-   Higher percentages for more difficulty

* * * * *

⚠️ Known Limitations
--------------------

-   No guaranteed solvable path in generated fields

-   No input validation beyond basic commands

-   Recursive game loop could be refactored to iterative for scalability

* * * * *

💡 Future Improvements
----------------------

-   Ensure generated fields are always solvable

-   Add difficulty levels

-   Track player score or moves

-   Add replay option after game over

-   Improve UI (colours, animations, etc.)

* * * * *

📚 Acknowledgements
-------------------

-   Built as part of the Codecademy Full-Stack Engineer course

-   Inspired by the "Find Your Hat" project brief

* * * * *

🧑‍💻 Author
------------

Ryan  

GitHub: <https://github.com/ryan-f-b/findYourHat>

* * * * *

📄 License
----------

This project is open source and available under the MIT License.