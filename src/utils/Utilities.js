export function deserializeFile(directoryId, file, isDir) {
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
export function deserializeFiles(directoryId, jsonFiles) {
    let files = []
    jsonFiles.SubFolders && jsonFiles.SubFolders.forEach(folder => {
        files.push(deserializeFile(directoryId, folder, true))
    })
    jsonFiles.Files && jsonFiles.Files.forEach(file => {
        files.push(deserializeFile(directoryId, file, false))
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