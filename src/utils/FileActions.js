import { defineFileAction } from "chonky";

export const scan = defineFileAction({
    id: "scan",
    button: {
        name: "Scan",
        toolbar: true,
        contextMenu: true,
        tooltip: "Scan the directory",
        icon: "search"
    },
});

export const cancel = defineFileAction({
    id: "cancel",
    button: {
        name: "Cancel",
        toolbar: true,
        contextMenu: true,
        tooltip: "Cancel",
        icon: "close"
    },
})