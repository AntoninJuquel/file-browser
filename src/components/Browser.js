import React, { useState, useRef, useEffect } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";
import { Rnd } from "react-rnd";

import { CustomIcons } from "../utils/IconsHandler";
import { handleCancel, handleOpenFiles, handleScan } from "../utils/ActionsHandler";
import { scan, cancel, selectFolder, sortActions, viewActions } from "../utils/FileActions";
import FileActionsButtons from "./FileActionsButtons";

import "../styles/ChonkyStyle.css";
import style from "./Browser.module.css";

export default function Browser({ mode, openSelection, connectors }) {
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

    useEffect(() => {
        let data = { payload: { files: [{ id: "root" }] } }
        handleOpenFiles({data, setFiles, folderChain, setFolderChain})
    }, [])

    function defaultFileActions(data) {
        const handler = { data, files, setFiles, folderChain, setFolderChain, ChonkyActions }
        console.log(data)
        switch (data.id) {
            case ChonkyActions.OpenFiles.id:
                handleOpenFiles(handler)
                break;
            default:
                console.log(handler)
                break;
        }
    }

    const modeMap = {
        "folder": {
            fileActions: [selectFolder, ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                if (data.id === selectFolder.id)
                    openSelection(data)
                else defaultFileActions(data)
            }
        },
        "file": {
            fileActions: [ChonkyActions.OpenSelection],
            onFileAction: (data) => {
                if (data.id === ChonkyActions.OpenFiles.id && !data.payload.files[0].isDir)
                    console.log(data)
                else defaultFileActions(data)
            }
        },
        "card": {
            fileActions: [scan, cancel],
            onFileAction: (data) => {
                if (data.id === scan.id) handleScan(data)
                else if (data.id === cancel.id) handleCancel(data)
                else if (data.id === ChonkyActions.OpenFiles.id && data.payload.targetFile.childrenCount !== undefined)
                    openSelection({ folders: data.payload.files, list: folderChain[folderChain.length - 1].id, path: folderChain[folderChain.length - 1].id.join("\\") })
                else if (data.id === ChonkyActions.MouseClickFile.id)
                    fileBrowserRef.current.setFileSelection(new Set([data.payload.file.id]))
                else defaultFileActions(data)
            }
        }
    }

    const fileBrowserRef = useRef(null)
    return (
        <Rnd
            style={{ flex: 1, flexDirection: "column", display: "flex" }}
            default={{ x: 0, y: 0, width: 800, height: 500 }}
            minWidth={800} minHeight={500}
            dragHandleClassName="handler"
            cancel=".nodrag"
            bounds="window"
        >
            <div className={["handler", style.browserWrapper].join(" ")}>
                <div className={style.browserTitle}>
                    Open folder...
                </div>
                <div className="nodrag" style={{ flex: 1 }} >
                    <FullFileBrowser
                        folderChain={folderChain}
                        files={files}
                        onFileAction={modeMap[mode].onFileAction}
                        fileActions={[...modeMap[mode].fileActions, ...sortActions, ...viewActions]}
                        defaultFileViewActionId={ChonkyActions.EnableListView.id}
                        ref={fileBrowserRef}
                        disableDefaultFileActions={true}
                        iconComponent={CustomIcons}
                    />
                </div>
                <FileActionsButtons fileActions={modeMap[mode].fileActions} fileBrowserRef={fileBrowserRef} />
            </div>
        </Rnd>
    )
}