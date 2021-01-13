import { memo } from "react";
import { ChonkyIconFA } from "chonky-icon-fontawesome";

const iconsMap = {
    "floppyDisk": '📁💾',
    "CANON_XF": '📁💾',
    "MEDIA_FILES": '📁💾'
};

export const CustomIcons = memo((props) => {
    const { isDir, type } = props.icon
    let iconString = ""

    if (typeof props.icon === "string")
        iconString = props.icon
    else if (type !== undefined && type !== "NONE" && type !== null)
        iconString = type
    else if (isDir)
        iconString = "folder"
    else
        iconString = "file"

    let newProps = { ...props, ...{ icon: iconString } }
    let icon = iconsMap[newProps.icon];
    if (icon) {
        return <span>{icon}</span>;
    }
    return <ChonkyIconFA {...newProps} />;
});