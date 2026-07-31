import './Cell.css'

export default function Cell({ cell, cellColour, cellSize }) {
    // Unpack Cell Data
    const { row, col, visited, paths } = cell

    // Derive Border Width
    const borderWidth = cellSize >= 15 ? 2 : 1;

    return(
        <div 
            className="cell"
            style={{
                // Cell Sizing
                "--cell-size": `${cellSize}px`,
                // Render Border when No Path Exists
                "borderTop": paths.north ? "none" : `${borderWidth}px solid var(--colour-cell-border)`,
                "borderBottom": paths.south ? "none" : `${borderWidth}px solid var(--colour-cell-border)`,
                "borderRight": paths.east ? "none" : `${borderWidth}px solid var(--colour-cell-border)`,
                "borderLeft": paths.west ? "none" : `${borderWidth}px solid var(--colour-cell-border)`,
                // Highlight Cell when Visited
                "backgroundColor": visited ? cellColour : "var(--colour-cell-unvisited)"
            }} 
        />
    );
}