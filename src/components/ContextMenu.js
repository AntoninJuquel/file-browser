export default function ContextMenu({x, y}) {
    return(
        <div style={{transform: `translate(${x}px, ${y}px)`, backgroundColor: "red", width: 50, height: 50, position: "absolute"}}>
            TEST
        </div>
    )
}