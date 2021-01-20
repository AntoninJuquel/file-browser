import style from "./FileActionsButtons.module.css";

export default function FileActionsButtons({ fileActions = [], browserRef }) {
    return (
        <div className={style.fileActionsBtnWrapper}>
            {fileActions.map(action =>
                <button
                    key={action.id}
                    className="nodrag"
                    onClick={() => browserRef.current.requestFileAction(action)}
                >
                    {action.button.name}
                </button>
            )}
        </div>
    )
}