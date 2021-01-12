import React, { useState, useRef } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";

import { handleMoveFolder, handleCreateFolder, handleDeleteFiles, handleOpenFiles, handleScanFolder } from "../utils/BrowserHandlers";
import { scan, cancel } from "../utils/FileActions";

export default function Browser({ mode, openSelection, connectors }) {
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

    const modeMap = {
        "folder": {
            fileActions: [scan, cancel],
            onFileAction: (data) => {
                switch (data.id) {
                    case scan.id:
                        handleOpenFiles({
                            data: { payload: { files: [{ id: ["C:"], name: "C", isDir: true, type: "NONE" }] } },
                            setFiles,
                            folderChain,
                            setFolderChain
                        })
                        break;
                    case cancel.id:
                        console.log("cancel")
                        break;
                    default:
                        break;
                }
            }
        },
        "file": {
            fileActions: []
        },
        "card": {
            fileActions: []
        }
    }

    function onFileAction(data) {
        const handler = { data, files, setFiles, folderChain, setFolderChain, ChonkyActions }
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
            case scan.id:
                handleScanFolder(handler)
                break;
            case cancel.id:
                break;
            default:
                break;
        }
    }

    const fileBrowserRef = useRef(null)
    return (
        <FullFileBrowser
            folderChain={folderChain}
            files={files}
            onFileAction={modeMap[mode].onFileAction}
            fileActions={modeMap[mode].fileActions}
            defaultFileViewActionId="enable_list_view"
            ref={fileBrowserRef}
        />
    )
}