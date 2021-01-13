import { ChonkyActions, defineFileAction } from "chonky";

ChonkyActions.OpenSelection.button.name = "Open"
ChonkyActions.OpenSelection.button.group = ""
ChonkyActions.OpenSelection.button.icon = ""

export const scan = defineFileAction({
    id: "scan",
    button: {
        name: "SCAN",
        toolbar: true,
        tooltip: "Scan the directory",
    },
});

export const cancel = defineFileAction({
    id: "cancel",
    button: {
        name: "CANCEL",
        toolbar: true,
        tooltip: "Cancel browsing",
    },
})

export const selectFolder = defineFileAction({
    id: "select_folder",
    button: {
        name: "SELECT FOLDER",
        toolbar: true,
        tooltip: "Select the directory",
    },
});