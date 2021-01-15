import React, { useState, useRef, useEffect } from "react";
import { FullFileBrowser, ChonkyActions } from "chonky";
import { Rnd } from "react-rnd";


import { CustomIcons } from "../utils/IconsHandler";
import { handleOpenFiles } from "../utils/ActionsHandler";
import { scan, cancel, selectFolder } from "../utils/FileActions";
import CustomButtons from "./CustomButtons";

export default function Browser({ mode, openSelection, connectors, style, darkMode }) {
    const [files, setFiles] = useState([null])
    const [folderChain, setFolderChain] = useState([null])

    useEffect(() => {
        fetch("http://localhost:3001/listDrives")
            .then(res => res.json())
            .then(result => {
                result.forEach(r => r.name = unescape(r.name))
                setFiles(result)
                setFolderChain([{ name: "root", id: "root" }])
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
            style={{ flex: 1, flexDirection: "column", display: "flex" }}
            default={{ x: 0, y: 0, width: 600, height: 500 }}
            minWidth={600} minHeight={500}
            dragHandleClassName="handler"
            cancel=".nodrag"
            bounds="window"
        >
            <div className="handler" style={{ display: "flex", flex: 1, flexGrow: 1, flexDirection: "column", backgroundColor: "black", padding: 25, borderRadius: 5 }}>
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
                        darkMode={darkMode}
                    />
                </div>
                <CustomButtons files={files} fileBrowserRef={fileBrowserRef} />
            </div>
        </Rnd>
    )
}