import style from "./FileActionsButtons.module.css";

export default function FileActionsButtons({ fileActions = [], fileBrowserRef }) {
    return (
        <div className={style.fileActionsBtnWrapper}>
            {fileActions.filter(fileAction => fileAction !== null).map(fileAction =>
                <button
                    key={fileAction.id}
                    className="nodrag"
                    onClick={() => fileBrowserRef.current.requestFileAction(fileAction)}
                >
                    {fileAction.button.name}
                </button>
            )}
        </div>
    )
}