import './Grid.css'
import Cell from '../Cell/Cell';
import { forwardRef } from 'react';

export default function Grid({ grid }) {
    // Guard Against No Grid State
    if (!grid || grid.length === 0) {
        // Return Null or Loading Placeholder
        return null;
    }

    // Derive Dimensions from Grid State
    const rows = grid.length;
    const cols = grid[0].length;

    // Return Grid, Visually Arranged into Columns via CSS
    return(
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 25px)` }}>
            { // Programmatically Create Grid Cells
            grid.map((row, rowIdx) =>
                row.map((cell, cellIdx) => (
                    <Cell
                        key={`${cell.row},${cell.col}`}
                        cell={cell}
                    />
                ))
            )}
        </div>
    );
};