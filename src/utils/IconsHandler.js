import { memo } from "react";
import { ChonkyIconFA } from "chonky-icon-fontawesome";

const iconsMap = {
    "root": '🖥️',
    "disk": '🖴',
    "folder": '📁',
    "CANON_XF": '💾',
};

export const CustomIcons = memo((props) => {
    let icon = iconsMap[props.icon];
    if (icon) return <span>{icon}</span>;
    return <ChonkyIconFA {...props} />;
});