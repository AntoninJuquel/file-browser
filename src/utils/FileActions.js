import { ChonkyActions, defineFileAction } from "chonky";

ChonkyActions.OpenSelection.button.name = "OPEN"
ChonkyActions.OpenSelection.button.group = ""
ChonkyActions.OpenSelection.button.icon = ""
ChonkyActions.OpenSelection.button.toolbar = false

ChonkyActions.OpenFileContextMenu = defineFileAction({
    id : "open_file_context_menu",
})

export const sortActions = [ChonkyActions.SortFilesByDate, ChonkyActions.SortFilesByName, ChonkyActions.SortFilesBySize]
export const viewActions = [ChonkyActions.EnableGridView, ChonkyActions.EnableListView]

export const scan = defineFileAction({
    id: "scan",
    button: {
        name: "SCAN",
        tooltip: "Scan the directory",
    }
});

export const cancel = defineFileAction({
    id: "cancel",
    button: {
        name: "CANCEL",
        tooltip: "Cancel browsing",
    }
})

export const selectFolder = defineFileAction({
    id: "select_folder",
    button: {
        name: "SELECT FOLDER",
        tooltip: "Select the directory",
    }
});