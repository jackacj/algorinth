import './Grid.css'
import Cell from '../Cell/Cell';
import { forwardRef } from 'react';

export default function Grid({ grid, cellColour }) {
    // Guard Against No Grid State
    if (!grid || grid.length === 0) {
        // Return Null or Loading Placeholder
        return null;
    }

    // Derive Dimensions from Grid State
    const rows = grid.length;
    const cols = grid[0].length;

    // Derive Cell Sizing
    const MAX_GRID_SIZE = 700;
    const MAX_CELL_SIZE = 25;
    const MIN_CELL_SIZE = 6;

    const cellSize = Math.max(
        MIN_CELL_SIZE,
        Math.min(
            MAX_CELL_SIZE,
            Math.floor(MAX_GRID_SIZE / Math.max(rows, cols))
        )
    );

    // Return Grid, Visually Arranged into Columns via CSS
    // Pass on Export Colour
    return(
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}>
            { // Programmatically Create Grid Cells
            grid.map((row, rowIdx) =>
                row.map((cell, cellIdx) => (
                    <Cell
                        key={`${cell.row},${cell.col}`}
                        cell={cell}
                        cellColour={cellColour}
                        cellSize={cellSize}
                    />
                ))
            )}
        </div>
    );
};