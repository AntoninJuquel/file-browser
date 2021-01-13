import React, { useState, useRef, useEffect } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";

import { CustomIcons } from "../utils/IconsHandler";
import { handleMoveFolder, handleCreateFolder, handleDeleteFiles, handleOpenFiles } from "../utils/ActionsHandler";
import { scan, cancel, selectFolder } from "../utils/FileActions";

export default function Browser({ mode, openSelection, connectors }) {
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

    useEffect(() => {
        handleOpenFiles({
            data: { payload: { files: [{ id: ["C:"], name: "C", isDir: true, type: "NONE" }] } },
            setFiles,
            folderChain,
            setFolderChain
        })
    }, [])

    function onFileAction(data) {
        const handler = { data, files, setFiles, folderChain, setFolderChain, ChonkyActions }
        //console.log(handler)
        switch (data.id) {
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

    const modeMap = {
        "folder": {
            fileActions: [selectFolder, ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                const handler = { data, files, setFiles, folderChain, setFolderChain, ChonkyActions }
                switch (data.id) {
                    case selectFolder.id:
                        console.log("select folder")
                        break;
                    case ChonkyActions.OpenFiles.id:
                        handleOpenFiles(handler)
                        break;
                    default:
                        onFileAction(data)
                        break;
                }
            }
        },
        "file": {
            fileActions: [ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                switch (data.id) {
                    case ChonkyActions.OpenFiles.id:
                        openSelection()
                        break;
                    default:
                        onFileAction(data)
                        break;
                }
            }
        },
        "card": {
            fileActions: [scan, cancel],
            onFileAction: (data) => {
                switch (data.id) {
                    case scan.id:
                        console.log("scan")
                        break;
                    case cancel.id:
                        console.log("cancel")
                        break;
                    case ChonkyActions.OpenFiles.id:
                        openSelection()
                        break;
                    case ChonkyActions.MouseClickFile.id:
                        fileBrowserRef.current.setFileSelection(new Set([data.payload.file.id]))
                        break;
                    default:
                        onFileAction(data)
                        break;
                }
            }
        }
    }

    const fileBrowserRef = useRef(null)
    return (
        <FullFileBrowser
            folderChain={folderChain}
            files={files}
            onFileAction={modeMap[mode].onFileAction}
            fileActions={[...modeMap[mode].fileActions, ChonkyActions.EnableListView, ChonkyActions.EnableGridView]}
            defaultFileViewActionId="enable_list_view"
            ref={fileBrowserRef}
            disableDefaultFileActions={true}
            iconComponent={CustomIcons}
        />
    )
}