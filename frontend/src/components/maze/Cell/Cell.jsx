import './Cell.css'

export default function Cell({ cell }) {
    // Unpack Cell Data
    const { row, col, visited, paths } = cell

    return(
        <div 
            className="cell"
            style={{
                // Render Border when No Path Exists
                "borderTop": paths.north ? "none" : "2px solid var(--colour-cell-border)",
                "borderBottom": paths.south ? "none" : "2px solid var(--colour-cell-border)",
                "borderRight": paths.east ? "none" : "2px solid var(--colour-cell-border)",
                "borderLeft": paths.west ? "none" : "2px solid var(--colour-cell-border)",
                // Highlight Cell when Visited
                "backgroundColor": visited ? "var(--colour-cell-visited)" : "var(--colour-cell-unvisited)"
            }} 
        />
    );
}