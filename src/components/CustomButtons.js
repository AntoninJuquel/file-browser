import React from "react";
import { ChonkyActions } from "chonky";

export default function CustomButtons({ fileBrowserRef, files }) {
    const selectRandomFiles = React.useCallback(() => {
        if (!fileBrowserRef.current) return
        const newSelection = new Set()
        for (const file of files) {
            if (Math.random() > 0.5) newSelection.add(file.id)
        }
        fileBrowserRef.current.setFileSelection(newSelection)
    }, [files])
    const invertSelection = React.useCallback(() => {
        if (!fileBrowserRef.current) return
        const oldSelection = fileBrowserRef.current.getFileSelection()
        const newSelection = new Set()
        for (const file of files) {
            if (!oldSelection.has(file.id.toString())) newSelection.add(file.id)
        }
        fileBrowserRef.current.setFileSelection(newSelection)
    }, [files])
    const clearSelection = React.useCallback(() => {
        if (!fileBrowserRef.current) return
        fileBrowserRef.current.requestFileAction(ChonkyActions.ClearSelection)
    }, [files])
    return (
        <div>
            <button onClick={selectRandomFiles}>
                Select random files
            </button>
            <button onClick={invertSelection}>
                Invert selection
            </button>
            <button onClick={clearSelection}>
                Clear selection
            </button>
        </div>
    )
}