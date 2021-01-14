import { deserializeFiles, serializeFiles } from "./Utilities";

export function handleOpenFiles(params) {
    const { data, setFiles, folderChain, setFolderChain } = params
    let selectedFile = data.payload.files[0]

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

export function handleCreateFolder(params) {
    const { files, setFiles, folderChain } = params

    let Name = prompt("File name")
    let path = [...folderChain[folderChain.length - 1].id, Name]

    //#region TO DO
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
    //#endregion

    console.log(serializeFiles(files))
}

export function handleDeleteFiles(params) {
    const { data, files, setFiles, folderChain } = params
    let newFiles = files.filter(file => !data.state.selectedFiles.includes(file))
    setFiles(newFiles)
}