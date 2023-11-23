# Maze_Genaration
Maze Generation Algorithm
I requested a maze generation algorithm to create a random tree structure within a specified area, forming a different path each time. The path will follow random rules within the given constraints. Additionally, a Stack data structure will be used, where the last in, first out principle is applied. This allows for retracing steps one by one. The maze can also be created without using the Stack structure. In this case, a coloring system can be used instead.

First Approach - Backtracking:
Path Creation: Initially, the program creates a planar graph in blue, represented by G and its two F's in a different color. Secondly, the areas it passes through are colored, marking the path in red. Finally, when all corners of F are visited, F is removed, and two sides of G are left as entrance and exit.

Progress: A large grid is created, starting from a random cell. It chooses an unvisited neighboring cell based on selected rules like priority search. Then, it removes the wall between the two cells and marks the new cell as visited. This process is added to the Stack to facilitate backtracking. When it reaches a visited cell with no neighbors, it uses the Stack to return to a cell with neighbors. This process continues until all cells are visited.

Second Approach - Coloring the Path:
Path Creation: Similar to the first approach, the program creates a planar graph in blue, represented by G and its two F's in a different color. Secondly, based on selected rules like priority search, the areas it passes through are colored, painting the path in red. Finally, when all corners of F are visited, F is removed, and two sides of G are left as entrance and exit.

Progress: A large grid is created, starting from a random cell. It chooses an unvisited neighboring cell and removes the wall between them. The new cell is marked as visited. If there is a path after the current cell, the wall is colored green. If there is no path, it remains uncolored and is randomly assigned to an empty cell. This process continues until (2x*2y) cells are processed.
