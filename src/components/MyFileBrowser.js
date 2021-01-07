import React, { useState } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";

import { handleCreateFolder, handleDeleteFiles, handleOpenFiles } from "../utils/FileBrowserHandlers";

export default function MyFileBrowser() {
    const [files, setFiles] = useState([])
    const [folderChain, setFolderChain] = useState([])

    const fileActions = [
        ChonkyActions.OpenFiles,
        ChonkyActions.OpenSelection,
        ChonkyActions.CreateFolder,
        ChonkyActions.DeleteFiles,
    ]
    function onFileAction(data) {
        const handler = 
        {
            data,
            files,
            setFiles,
            folderChain,
            setFolderChain
        }
        console.log(handler)
        switch (data.id) {
            case ChonkyActions.OpenFiles.id:
                handleOpenFiles(handler)
                break;
            case ChonkyActions.CreateFolder.id:
                handleCreateFolder(handler)
                break;
            case ChonkyActions.DeleteFiles.id:
                handleDeleteFiles(handler)
                break;
            default:
                break;
        }
    }
    return (
        <FullFileBrowser
            folderChain={folderChain}
            files={files}
            onFileAction={onFileAction}
            fileActions={fileActions}
        />
    )
}