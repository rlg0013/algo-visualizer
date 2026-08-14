# Algorithm Visualizer

A React algorithm visualizer that turns sorting and pathfinding algorithms into replayable step-by-step animations. It is built around reusable algorithm step generators, so the visualization logic stays separate from the UI that renders bars, grids, controls, and playback state.

## Live Demo

https://algo-visualizer-eta-seven.vercel.app

## Features

- 5 sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort
- Interactive graph pathfinding with BFS, DFS, and Dijkstra
- User-placed start and end cells, weighted cells, and drag-to-draw walls
- Adjustable sorting array size and shared animation speed controls
- Play, pause, reset, and generate-new-array controls
- Time and space complexity display for each algorithm
- Responsive React UI with separate sorting and graph routes

## Architecture

The app is organized around a step-recording model. Each algorithm runs as plain JavaScript against a copy of the current data structure and returns a list of serializable steps such as `compare`, `swap`, `markSorted`, `visit`, and `path`. That keeps the algorithm files focused on algorithm behavior, while the React pages decide how to convert the current step into visible state.

`useAnimationPlayer` is the shared playback layer for both the sorting and graph modules. It owns the current step index, play/pause state, reset behavior, and speed control, which lets the visualizers reuse the same timing model even though one renders bars and the other renders a grid.

```text
Algorithm input
     |
     v
Step generator files
     |
     v
Recorded steps
     |
     v
useAnimationPlayer
     |
     v
Sorting bars / graph grid renderers
```

The sorting page reconstructs the array at the selected step with `getArrayAtStep` and derives completed positions with `getSortedIndices`. The graph page derives visited and shortest-path cells with `getVisitedCells` and `getPathCells`, while the grid itself stays editable so users can change walls, weights, and start/end placement before replaying an algorithm.

## Tech Stack

- React
- Vite
- Tailwind CSS v4
- React Router
- ESLint
- Vercel

## Running Locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  algorithms/
    graphs/           BFS, DFS, and Dijkstra step generators
    sorting/          Sorting algorithm step generators
  components/         Bars, grid, controls, and navigation
  hooks/              Shared animation playback logic
  pages/              Sorting and graph visualizer routes
  utils/              Helpers that derive visual state from recorded steps
```

## What I'd Add Next

- A* search with heuristic visualization so users can compare it against Dijkstra on the same weighted grid
- Tree visualizations for BFS, DFS, binary search trees, and heap operations
- Dynamic programming visualizations with table state playback for problems like knapsack, LCS, and coin change
- Maze generation presets to create more interesting pathfinding test cases
- Better mobile touch handling for drawing walls and weights on smaller screens
- Step-by-step explanations beside the animation so the app can work as both a visualizer and a learning tool

## License

This project is currently private/personal unless a license is added.
