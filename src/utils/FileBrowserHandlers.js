function parseFile(file, index, isDir) {
    return {
        id: index + 1,
        name: unescape(file.Name),
        isDir,
        modDate: file.Date,
        childrenCount: isDir && (file.count === undefined ? 0 : file.count),
        path: isDir && unescape(file.AVStruct.path).replace("\\", "/").split("/"),
        type: isDir ? file.AVStruct.type : file.AVType
    }
}

export function handleJsonBrowser(jsonBrowser) {
    let files = []

    jsonBrowser.SubFolders.forEach((folder, index) => {
        files.push(parseFile(folder, index, true))
    })
    jsonBrowser.Files.forEach(file => {
        files.push(parseFile(file, files.length, false))
    })

    let folderChain = []
    files[0].path.slice(0, files[0].path.indexOf(files[0].name)).forEach(folder => folderChain.push(parseFile(
        {
            Name: folder,
            AVStruct: { path: folder }
        },
        files.length,
        true
    )))

    return { files, folderChain }
}
export function handleOpenFiles(params) {
    const { data, setFiles, folderChain, setFolderChain } = params
    let selectedFile = data.payload.files[0]
    if(!selectedFile.isDir){
        console.log("OPEN FILE API")
        return
    }
    let newFolderChain = []
    if (folderChain.includes(selectedFile))
        newFolderChain = folderChain.slice(0, folderChain.indexOf(selectedFile) + 1)
    else
        newFolderChain = [...folderChain, selectedFile]

    setFolderChain(newFolderChain)
    /*setFiles(handleJsonBrowser(JSONCALLAPI))*/console.log("SEND ME CHILDRENS FILE API")
}

export function handleDeleteFiles(params) {
    const { data, files, setFiles } = params
    setFiles(files.filter(file => !data.state.selectedFiles.includes(file)))
}

export function handleCreateFolder(params) {
    const { files, setFiles, folderChain } = params
    let Name = prompt("Enter folder name")
    let newFile = parseFile(
        {
            Name,
            Date: new Date().toLocaleDateString().split("/").reverse().join("-") + " " + new Date().toLocaleTimeString(),
            AVStruct: { path: folderChain[0].name + "/" + Name }
        },
        files.length,
        true,
    )
    setFiles([...files, newFile])
}

export function handleScanFolder(params) {
    console.log("SCAN FOLDER API")
    console.log(params.files)
}