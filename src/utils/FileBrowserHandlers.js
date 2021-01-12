function deserializeFile(directoryId, file, isDir) {
    const { type, path } = isDir ? file.AVStruct : { type: file.AVType, path: [...directoryId, "/"].join("/") + file.Name }
    return {
        id: unescape(path).replaceAll("\\", "/").split("/").filter(dir => dir !== ""),
        name: unescape(file.Name),
        isDir,
        modDate: file.Date,
        childrenCount: isDir && (file.count === undefined ? 0 : file.count),
        type,
        icon: { isDir, type },
    }
}
function serializeFiles(files) {
    let SubFolders = []
    let Files = []

    files.length > 1 &&
        files.forEach(file => {
            if (file.isDir) {
                SubFolders.push({
                    Date: file.modDate,
                    Name: escape(file.name),
                    AVStruct: {
                        type: file.type,
                        path: escape(file.id.join("\\"))
                    }
                })
            } else {
                Files.push({
                    Date: file.modDate,
                    Name: escape(file.name),
                    AVType: file.type
                })
            }
        })

    return JSON.stringify({
        browse: {
            SubFolders,
            Files
        }
    })
}

function getFiles(directoryId, jsonFiles) {
    let files = []
    jsonFiles.SubFolders && jsonFiles.SubFolders.forEach(folder => {
        files.push(deserializeFile(directoryId, folder, true))
    })
    jsonFiles.Files && jsonFiles.Files.forEach(file => {
        files.push(deserializeFile(directoryId, file, false))
    })
    return files
}

export function handleOpenFiles(params) {
    const { data, setFiles, folderChain, setFolderChain } = params
    let selectedFile = data.payload.files[0]

    console.log(selectedFile)

    if (selectedFile.type !== "NONE" && selectedFile.type !== undefined) {
        console.log("Folder", selectedFile.id, selectedFile.type)
        return;
    } else if (!selectedFile.isDir) {
        console.log("File", selectedFile.id, selectedFile.type)
        return;
    } else {
        setFolderChain([null])
        setFiles([null])
        fetch("http://localhost:3001/directories/" + selectedFile.id)
            .then(res => res.json())
            .then(result => {
                let newFolderChain = folderChain.includes(selectedFile) ?
                    folderChain.slice(0, folderChain.indexOf(selectedFile) + 1) :
                    [...folderChain, selectedFile]
                setFolderChain(newFolderChain.filter(folder => folder !== null))
                setFiles(getFiles(result.id, result.browse))
            })
            .catch(console.log)
    }
}

export function handleDeleteFiles(params) {
    const { data, files, setFiles, folderChain } = params
    let newFiles = files.filter(file => !data.state.selectedFiles.includes(file))
    fetch("http://localhost:3001/directories/" + folderChain[folderChain.length - 1].id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: serializeFiles([...newFiles])
    })
        .catch(console.log)
    data.state.selectedFiles.forEach(file => fetch("http://localhost:3001/directories/" + file.id, {
        method: "DELETE"
    })
        .catch(console.log))

    setFiles(newFiles)
}

export function handleCreateFolder(params) {
    const { files, setFiles, folderChain } = params
    let Name = prompt("Enter folder name")
    let newFile = deserializeFile(
        folderChain[folderChain.length - 1].id,
        {
            Name,
            Date: new Date().toLocaleDateString().split("/").reverse().join("-") + " " + new Date().toLocaleTimeString(),
            AVStruct: { path: folderChain[folderChain.length - 1].id + "/" + Name, type: prompt("Folder type") },
        },
        true,
    )
    fetch("http://localhost:3001/directories/" + folderChain[folderChain.length - 1].id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: serializeFiles([...files, newFile])
    })
        .then(result => {
            setFiles([...files, newFile])
        })
        .catch(console.log)
    fetch("http://localhost:3001/directories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: unescape(folderChain[folderChain.length - 1].id + "\\" + Name).split("\\"), browse: { SubFolders: [], Files: [] } })
    })
        .catch(console.log)
}

export function handleMoveFolder(params) {
    
}

export function handleScanFolder(params) {
    console.log("SCAN FOLDER API")
    console.log(params)
}