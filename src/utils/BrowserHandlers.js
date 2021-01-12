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
function deserializeFiles(directoryId, jsonFiles) {
    let files = []
    jsonFiles.SubFolders && jsonFiles.SubFolders.forEach(folder => {
        files.push(deserializeFile(directoryId, folder, true))
    })
    jsonFiles.Files && jsonFiles.Files.forEach(file => {
        files.push(deserializeFile(directoryId, file, false))
    })
    return files
}
function serializeFile(file) {
}
function serializeFiles(files) {
    let SubFolders = []
    let Files = []

    files.forEach(file => {
        if (file.isDir) {
            SubFolders.push({
                Date: file.modDate,
                Name: file.name,
                AVStruct: {
                    type: file.type,
                    path: escape(file.id.join("\\"))
                }
            })
        } else {
            Files.push({
                Date: file.modDate,
                Name: file.name,
                AVType: file.type
            })
        }
    })

    return { SubFolders, Files }
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
                setFiles(deserializeFiles(selectedFile.id, result.browse))
            })
            .catch(console.log)
    }
}

export function handleCreateFolder(params) {
    const { files, setFiles, folderChain } = params

    let Name = prompt("File name")
    let path = [...folderChain[folderChain.length - 1].id, Name]

    let newFolder =
    {
        Date: new Date().toLocaleDateString().split("/").reverse().join("-") + " " + new Date().toLocaleTimeString(),
        Name,
        AVStruct: {
            type: "NONE",
            path: escape(path.join("\\"))
        }
    }

    let newEmptyFolder =
    {
        id: path,
        browse: {
            SubFolders: [],
            Files: []
        }
    }

    console.log(serializeFiles(files))
}

export function handleDeleteFiles(params) {
    const { data, files, setFiles, folderChain } = params
    let newFiles = files.filter(file => !data.state.selectedFiles.includes(file))
    setFiles(newFiles)
}

export function handleMoveFolder(params) {
}

export function handleScanFolder(params) {
    console.log("SCAN FOLDER API")
    console.log(params)
}