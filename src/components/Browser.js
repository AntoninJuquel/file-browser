import React, { useState, useRef, useEffect } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";


import { CustomIcons } from "../utils/IconsHandler";
import { handleMoveFolder, handleCreateFolder, handleDeleteFiles, handleOpenFiles } from "../utils/ActionsHandler";
import { scan, cancel, selectFolder } from "../utils/FileActions";
import { Rnd } from "react-rnd";

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

    const modeMap = {
        "folder": {
            fileActions: [selectFolder, ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                if (data.id === selectFolder.id)
                    openSelection(data)
                else
                    onFileAction(data)
            }
        },
        "file": {
            fileActions: [ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                if (data.id === ChonkyActions.OpenFiles.id && !data.payload.targetFile.isDir)
                    openSelection({ folders: data.payload.files, list: folderChain[folderChain.length - 1].id, path: folderChain[folderChain.length - 1].id.join("\\") })
                else
                    onFileAction(data)
            }
        },
        "card": {
            fileActions: [scan, cancel],
            onFileAction: (data) => {
                if (data.id === scan.id)
                    console.log("scan")
                else if (data.id === cancel.id)
                    console.log("cancel")
                else if (data.id === ChonkyActions.OpenFiles.id && data.payload.targetFile.childrenCount !== undefined)
                    openSelection({ folders: data.payload.files, list: folderChain[folderChain.length - 1].id, path: folderChain[folderChain.length - 1].id.join("\\") })
                else if (data.id === ChonkyActions.MouseClickFile.id)
                    fileBrowserRef.current.setFileSelection(new Set([data.payload.file.id]))
                else
                    onFileAction(data)
            }
        }
    }

    const fileBrowserRef = useRef(null)
    return (
        <Rnd
            dragHandleClassName="handler"
            style={{ flex: 1, flexDirection: "column", display: "flex", backgroundColor: "pink", border: "solid 1px #ddd" }}
            default={{ width: 700, height: 700, x: 0, y: 0 }}
            minHeight={500}
        >
            <div className="handler" style={{ height: 25, width: "100%", backgroundColor: "black" }}></div>
            <div style={{ flexGrow: 1 }}>
                <FullFileBrowser
                    folderChain={folderChain}
                    files={files}
                    onFileAction={modeMap[mode].onFileAction}
                    fileActions={[...modeMap[mode].fileActions, ChonkyActions.EnableListView, ChonkyActions.EnableGridView]}
                    defaultFileViewActionId="enable_list_view"
                    ref={fileBrowserRef}
                    disableDefaultFileActions={true}
                    iconComponent={CustomIcons}
                    darkMode={true}
                />
            </div>
        </Rnd>
    )
}