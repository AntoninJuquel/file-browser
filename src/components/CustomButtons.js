import { ChonkyActions } from "chonky";

export default function CustomButtons({ fileBrowserRef, files }) {
    function selectRandomFiles() {
        if (!fileBrowserRef.current) return
        const newSelection = new Set()
        for (const file of files) {
            if (Math.random() > 0.5) newSelection.add(file.id)
        }
        fileBrowserRef.current.setFileSelection(newSelection)
    }
    function invertSelection() {
        if (!fileBrowserRef.current) return
        const oldSelection = fileBrowserRef.current.getFileSelection()
        const newSelection = new Set()
        for (const file of files) {
            if (!oldSelection.has(file.id.toString())) newSelection.add(file.id)
        }
        fileBrowserRef.current.setFileSelection(newSelection)
    }
    function clearSelection() {
        if (!fileBrowserRef.current) return
        fileBrowserRef.current.requestFileAction(ChonkyActions.ClearSelection)
    }
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