import { ChonkyActions, defineFileAction } from "chonky";

ChonkyActions.OpenSelection.button.name = "OPEN"
ChonkyActions.OpenSelection.button.group = ""
ChonkyActions.OpenSelection.button.icon = ""
ChonkyActions.OpenSelection.button.toolbar = false

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