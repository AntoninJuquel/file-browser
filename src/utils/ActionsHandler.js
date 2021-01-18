export function handleOpenFiles(params) {
    const { data, setFiles, folderChain, setFolderChain } = params
    let selectedFile = data.payload.files[0]

    setFolderChain([null])
    setFiles([null])
    if (selectedFile.id === "root")
        fetch("http://localhost:3001/listDrives")
            .then(res => res.json())
            .then(result => {
                result.forEach(r => r.name = unescape(r.name))
                result.forEach(r => {
                    r.isDir = r.type !== "file"
                    r.name = unescape(r.name)
                })
                setFiles(result)
                setFolderChain([{ name: "root", id: "root", isDir: true }])
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
                result.items.forEach(r => {
                    r.isDir = r.type !== "file"
                    r.name = unescape(r.name)
                })
                setFiles(result.items)
            })
            .catch(console.log)
}