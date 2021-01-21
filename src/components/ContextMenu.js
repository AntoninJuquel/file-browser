import React, { forwardRef, useImperativeHandle, useState } from "react";

const ContextMenu = forwardRef((props, ref) => {
    const [position, setPosition] = useState({ x: null, y: null })

    useImperativeHandle(ref, () => {
        return {
            setPosition: setPosition,
        }
    })

    return (
        position.x === null || position.y === null ? null
            :
            <div style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: "greenyellow", position: "absolute", display: "flex" }}>
                <button onClick={() => console.log(props.fileBrowserRef.current.getFileSelection())}>OPEN</button>
            </div>

    )
})

export default ContextMenu