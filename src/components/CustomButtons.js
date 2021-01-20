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
        <div style={{ display: "flex",backgroundColor: "#202020", justifyContent: "flex-end", paddingBottom: 10, paddingRight: 10 }}>
            <button className="nodrag" onClick={selectRandomFiles} style={{backgroundColor: "black", color:  "white"}}>
                Select random files
            </button>
            <button className="nodrag" onClick={invertSelection} style={{backgroundColor: "black", color:  "white"}}>
                Invert selection
            </button>
            <button className="nodrag" onClick={clearSelection} style={{backgroundColor: "black", color:  "white"}}>
                Clear selection
            </button>
        </div>
    )
}