# The-Maze
You're an adventurer in search of fortune, your quest is to retrieve a chest full of treasures from a cave.

Once you hit the chest it will travel until it collides with something,
use the rocks positioning to your advantage and reach the hole to exit from the cave.


## Features
* [Level editor](#level-editor)
* [Scores and replays](#scores-replays)
* [Undo and redo actions](#undo-redo)
* [Resume progress](#resume-progress)


### Level editor
Every logged in user can create new levels from the workshop page.

The editor checks if a level can be beaten through a BFS on a graph representing the locations that can be reached by the chest.


### Scores and replays
*Logged in*:
  after beating a level the score and replay are saved on the server.
  
*Not logged in*:
  the score and replay are instead temporarily saved in the local storage,
  they are claimed by the first user to log in on the same computer.


### Undo and redo actions
While playing you can undo and redo actions pressing the *Q* and *E* keys.


### Resume progress
The `window.onbeforeunload()` event is used to save the current state of the level in the local storage.

Each user can have one save per level, they're automatically retrieved and loaded when opening a level page.
