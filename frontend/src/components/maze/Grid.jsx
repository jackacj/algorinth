import '../../styles/Grid.css'
import Cell from './Cell';

// Create Default (Closed) Grid from Dimensions
function createGrid(rows, cols) {
    const grid = []

    // For Each Row...
    for (let row = 0; row < rows; row++) {
        const currentRow = [];

        // For Each Column... (Individual Cell)
        for (let col = 0; col < cols; col++) {
            // Add Cell Data to (Row,Col) Position in Current Row
            currentRow.push({
                row,
                col,
                visited: false,
                paths: {
                    north: false,
                    south: false,
                    east: false,
                    west: false
                }
            });
        }

        // Add Current Row to Grid
        grid.push(currentRow)
    }

    return grid
}

export default function Grid({ rows, cols }) {
    // Create Default (Closed) Grid
    const grid = createGrid(rows, cols);

    // Return Grid, Visually Arranged into Columns via CSS
    return(
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 25px)` }}>
            { // Programmatically Create Grid Cells
            grid.map((row, rowIdx) =>
                row.map((cell, cellIdx) => (
                    <Cell
                        cell={cell}
                    />
                ))
            )}
        </div>
    );
}