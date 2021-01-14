function pathToList(path) {
    return unescape(path).replaceAll("\\", "/").split("/").filter(dir => dir !== "")
}
export function deserializeFile(file, isDir) {
    return {
        name: unescape(file.Name),
        isDir,
        modDate: file.Date
    }
}
export function deserializeFiles(directoryId, jsonFiles) {
    let files = []
    jsonFiles.SubFolders && jsonFiles.SubFolders.forEach(folder => {
        let icon = "folder"
        if(folder.count)
            icon += ",video"
        files.push({
            ...deserializeFile(folder, true),
            ...{ id: pathToList(folder.AVStruct.path), type: folder.AVStruct.type, childrenCount: folder.count, icon }
        })
    })
    jsonFiles.Files && jsonFiles.Files.forEach(file => {
        files.push({
            ...deserializeFile(file, false),
            ...{ id: pathToList([...directoryId, "/"].join("/") + file.Name), type: file.AVType }
        })
    })
    return files
}
export function serializeFile(file) {
}
export function serializeFiles(files) {
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