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
        fetch("http://localhost:3001/listDrives")
            .then(res => res.json())
            .then(result => {
                setFolderChain([{ name: "root", id: "root", isDir: true }])
                displayNewFiles(setFiles,result)
            })
            .catch(console.log)
    else
        fetch("http://localhost:3001/browse/" + selectedFile.id)
            .then(res => res.json())
            .then(result => {
                let newFolderChain = folderChain.includes(selectedFile) ?
                folderChain.slice(0, folderChain.indexOf(selectedFile) + 1) :
                [...folderChain, selectedFile]
                setFolderChain(newFolderChain.filter(folder => folder !== null))
                displayNewFiles(setFiles,result.items)
            })
            .catch(console.log)
}

export function handleScan(data) {

}

export function handleCancel(data) {

}

export function handleSelectFolder(data) {

}