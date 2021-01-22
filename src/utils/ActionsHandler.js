import { fetchListDrives, fetchBrowse } from "./api";

function displayNewFiles(setFiles, files) {
    files.forEach(r => r.name = unescape(r.name))
    files.forEach(r => {
        r.isDir = r.type !== "file"
        r.name = unescape(r.name)
    })
    setFiles(files)
}
export function handleOpenFiles({ data, setFiles, folderChain, setFolderChain }) {
    let selectedFile = data.payload.files[0]

    setFolderChain([null])
    setFiles([null])
    if (selectedFile.id === "root")
        fetchListDrives().then(
            result => {
                setFolderChain([{ name: "root", id: "root", isDir: true }])
                displayNewFiles(setFiles, result)
            }
        )
    else
        fetchBrowse(selectedFile.id).then(
            result => {
                let newFolderChain = folderChain.includes(selectedFile) ?
                    folderChain.slice(0, folderChain.indexOf(selectedFile) + 1) :
                    [...folderChain, selectedFile]
                setFolderChain(newFolderChain.filter(folder => folder !== null))
                displayNewFiles(setFiles, result.items)
            }
        )
}

export function handleScan(data) {

}

export function handleCancel(data) {

}

export function handleSelectFolder(data) {

}