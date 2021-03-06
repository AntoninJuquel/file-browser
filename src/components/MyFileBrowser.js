import React, { useState, useRef } from "react";
import { FullFileBrowser, ChonkyActions, defineFileAction } from "chonky";

import { handleMoveFolder, handleCreateFolder, handleDeleteFiles, handleOpenFiles, handleScanFolder } from "../utils/FileBrowserHandlers";

import CustomButtons from "./CustomButtons";

export default function MyFileBrowser() {
    const [browsing, setBrowsing] = useState(false)
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

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
            {browsing ?
                <FullFileBrowser
                    folderChain={folderChain}
                    files={files}
                    onFileAction={onFileAction}
                    fileActions={fileActions}
                    defaultFileViewActionId="enable_list_view"
                    ref={fileBrowserRef}
                />
                :
                <button onClick={() => {
                    setBrowsing(true)
                    handleOpenFiles({
                        data: { payload: { files: [{ id: ["C:"], name: "C", isDir: true, type: "NONE" }] } },
                        setFiles,
                        folderChain,
                        setFolderChain
                    })
                }}>
                    Browse files
            </button>

            }
        </>
    )
}