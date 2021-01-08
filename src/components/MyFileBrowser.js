import React, { useState, useRef } from "react";
import { FullFileBrowser, ChonkyActions, defineFileAction } from "chonky";

import { handleJsonBrowser, handleCreateFolder, handleDeleteFiles, handleOpenFiles, handleScanFolder } from "../utils/FileBrowserHandlers";

import jsonBrowser from "../json/broswer-2.json";
import CustomButtons from "./CustomButtons";

export default function MyFileBrowser() {
    const [files, setFiles] = useState(handleJsonBrowser(jsonBrowser).files)
    const [folderChain, setFolderChain] = useState(handleJsonBrowser(jsonBrowser).folderChain)

    const scanFolder = defineFileAction({
        id: "scan_folder",
        button: {
            name: "Scan",
            toolbar: true,
            contextMenu: true,
            tooltip: "Scan the directory",
            icon: "search"
        },
    });

    const fileActions = [
        scanFolder,
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
            case scanFolder.id:
                handleScanFolder(handler);
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