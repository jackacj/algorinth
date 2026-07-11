import './Cell.css'

export default function Cell({ cell }) {
    // Unpack Cell Data
    const { row, col, visited, paths } = cell

    return(
        <div 
            className="cell"
            style={{
                // Render Border when No Path Exists
                "borderTop": paths.north ? "none" : "2px solid black",
                "borderBottom": paths.south ? "none" : "2px solid black",
                "borderRight": paths.east ? "none" : "2px solid black",
                "borderLeft": paths.west ? "none" : "2px solid black",
                // Highlight Cell when Visited
                "backgroundColor": visited ? "lightskyblue" : "white"
            }} 
        />
    );
}