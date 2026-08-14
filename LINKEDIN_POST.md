# LinkedIn Post Draft

I just deployed my Algorithm Visualizer, a React app for exploring sorting and graph pathfinding algorithms through step-by-step animations.

Live demo: https://algo-visualizer-eta-seven.vercel.app
GitHub: https://github.com/rlg0013/algo-visualizer

What it includes:
- Sorting visualizations for Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort
- Graph pathfinding for BFS, DFS, and Dijkstra
- User-placed start/end cells, draggable walls, weighted cells, and speed controls
- A reusable animation system shared across both sorting bars and graph grids

The part I focused on most was the architecture. Instead of tying the algorithms directly to the UI, each algorithm records a list of steps like compare, swap, visit, and path. React then renders those steps through a shared `useAnimationPlayer` hook. That separation made it much easier to add multiple algorithms without rewriting the playback logic every time.

Future additions I want to explore:
- A* search with heuristic visualization
- Tree traversal and heap visualizations
- Dynamic programming table playback for problems like knapsack and LCS
- Maze generation presets for pathfinding
- More explanatory text beside each animation

This project helped me practice React state design, routing, reusable hooks, algorithm implementation, and production deployment with Vercel.
