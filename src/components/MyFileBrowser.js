import React, { useState, useRef } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";

import { handleJsonBrowser, handleCreateFolder, handleDeleteFiles, handleOpenFiles } from "../utils/FileBrowserHandlers";

import jsonBrowser from "../json/broswer-2.json";
import CustomButtons from "./CustomButtons";

export default function MyFileBrowser() {
    const [files, setFiles] = useState(handleJsonBrowser(jsonBrowser).files)
    const [folderChain, setFolderChain] = useState(handleJsonBrowser(jsonBrowser).folderChain)

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
        //console.log(handler)
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

    const fileBrowserRef = useRef(null)
    return (
        <>
            <CustomButtons fileBrowserRef={fileBrowserRef} files={files} />
            <FullFileBrowser
                folderChain={folderChain}
                files={files}
                onFileAction={onFileAction}
                fileActions={fileActions}
                defaultFileViewActionId="enable_list_view"
                ref={fileBrowserRef}
            />
        </>
    )
}