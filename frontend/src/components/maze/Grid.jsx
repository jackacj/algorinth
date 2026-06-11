import '../../styles/Grid.css'
import Cell from './Cell';

export default function Grid({ rows, cols }) {
    const totalCells = rows * cols;

    // Return CSS Grid
    return(
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 25px)` }}>
            { // Programmatically Create Grid Cells
            Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => (
                    <Cell
                        row={row}
                        col={col}
                    />
                ))
            )}
        </div>
    );
}