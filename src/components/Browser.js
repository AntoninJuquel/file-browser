import React, { useState, useRef, useEffect } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";
import { Rnd } from "react-rnd";


import { CustomIcons } from "../utils/IconsHandler";
import { handleOpenFiles } from "../utils/ActionsHandler";
import { scan, cancel, selectFolder } from "../utils/FileActions";
import FileActionsButtons from "./FileActionsButtons";

import "../styles/ChonkyStyle.css";
import style from "./Browser.module.css";

export default function Browser({ mode, openSelection, connectors }) {
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

    useEffect(() => {
        fetch("http://localhost:3001/listDrives")
            .then(res => res.json())
            .then(result => {
                result.forEach(r => {
                    r.isDir = r.type !== "file"
                    r.name = unescape(r.name)
                })
                setFiles(result)
                setFolderChain([{ name: "root", id: "root", isDir: true }])
            })
            .catch(console.log)
    }, [])

    function onFileAction(data) {
        const handler = { data, files, setFiles, folderChain, setFolderChain, ChonkyActions }
        //console.log(handler)
        switch (data.id) {
            case ChonkyActions.OpenFiles.id:
                handleOpenFiles(handler)
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
                if (data.id === ChonkyActions.OpenFiles.id && !data.payload.files[0].isDir)
                    console.log(data)
                else
                    onFileAction(data)
            }
        },
        "card": {
            fileActions: [scan, cancel],
            onFileAction: (data) => {
                if (data.id === scan.id)
                    console.log(data)
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
            style={{ flex: 1, flexDirection: "column", display: "flex" }}
            default={{ x: 0, y: 0, width: 600, height: 500 }}
            minWidth={600} minHeight={500}
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
                        fileActions={[...modeMap[mode].fileActions, ChonkyActions.EnableListView, ChonkyActions.EnableGridView]}
                        defaultFileViewActionId="enable_list_view"
                        ref={fileBrowserRef}
                        disableDefaultFileActions={true}
                        iconComponent={CustomIcons}
                    />
                </div>
                <FileActionsButtons fileActions={modeMap[mode].fileActions} browserRef={fileBrowserRef} />
            </div>
        </Rnd>
    )
}