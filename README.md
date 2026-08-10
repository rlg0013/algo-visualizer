# Algo Visualizer

A clean, minimal algorithm visualizer built with React, Vite, and Tailwind CSS. The current app focuses on sorting algorithms with animated bars, playback controls, complexity info, and a simple legend for comparing, unsorted, and sorted values.

## Features

- Sorting visualizer with animated bar updates
- Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort options
- Adjustable array size with a readable visual range
- Adjustable animation speed with a percentage display
- Play, pause, reset, and generate-new-array controls
- Time and space complexity display for each algorithm
- Minimal responsive UI with clean panels and controls

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  algorithms/
    sorting/          Sorting algorithm step generators
  components/         Reusable UI pieces like bars, controls, and navbar
  hooks/              Animation playback logic
  pages/              Sorting and graph pages
  utils/              Helpers for deriving array state and sorted indices
```

## Current Status

The sorting page is the main completed area right now. The graph page route exists as a placeholder for future visualization work.

## License

This project is currently private/personal unless a license is added.
