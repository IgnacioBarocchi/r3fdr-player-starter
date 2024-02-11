import Floor from "../../classes/Floor/Floor";
import Wall from "../../classes/Wall/Wall";
const s = 8;

export default function generateMaze(rows: number, cols: number) {
  // Initialize the maze grid
  const maze = Array.from({ length: rows }, () =>
    Array(cols).fill(new Wall(null, [0, 0], "h", s))
  );

  // Create a helper function for DFS
  function dfs(row: number, col: number) {
    maze[row][col] = new Floor(null, s); // Set the cell as a floor

    // Define possible directions (up, down, left, right)
    const directions = [
      [0, -2], // Up
      [0, 2], // Down
      [-2, 0], // Left
      [2, 0], // Right
    ];

    // Shuffle the directions randomly
    directions.sort(() => Math.random() - 0.5);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check if the new cell is within bounds
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (maze[newRow][newCol] instanceof Wall) {
          // Carve a passage between the current cell and the new cell
          maze[newRow - Math.sign(dr)][newCol - Math.sign(dc)] = new Floor(
            null,
            8
          );
          dfs(newRow, newCol);
        }
      }
    }
  }

  // Start DFS from the top-left corner
  dfs(0, 0);

  return maze;
}
