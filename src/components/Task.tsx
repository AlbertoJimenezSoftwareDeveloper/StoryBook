import type { TaskData } from "../types";


type TaskProps = {
    task: TaskData;
    //*Event to change the task to archive
    onArchiveTask: (id: string) => void;
    //* Event to change the task to pionned*/
    onPinTask: (id: string) => void;
}

export default function Task({
    /**composition of the task*/
    task: { id, title, state },
    onArchiveTask,
    onPinTask,
}: TaskProps) {
    return (
    

            <div className={`list-item ${state}`}>
                <label
                    htmlFor={`{archiveTask=${id}`}
                    aria-label={`archiveTask-${id}`}
                    className="checkbox">
                    <input
                        type="checkbox"
                        disabled={true}
                        name="checked"
                        id={`archiveTask-${id}`}
                        checked={state == "TASK_ARCHIVED"}
                    />
                    <span className="checkbox-custom"
                        onClick={() => onArchiveTask(id)} />
                </label>
            

            <label htmlFor={`title${id}`} aria-label={title} className="title">
                <input
                    type="text"
                    value={title}
                    readOnly={true}
                    name="title"
                    id={`title-${id}`}
                    placeholder="Input title" />
            </label>

            {state !== "TASK_ARCHIVED" && (
        <button
        className="pin-button"
            onClick={() => onPinTask(id)}
            id={`pinTask-${id}`}
            key={`pinTask-${id}`}
        >
            <span className="{`ìcon-star`}" />
        </button >
    )
}
</div>

);
}

    // <div className="list-item">
    //     <label htmlFor={`title=${id}`} aria-label={title}>
    //         <input
    //         type="text"
    //         value={title}
    //         readOnly={true}
    //         name="title"
    //         id={`title=${id}`}/>
    //     </label>
    //     </div>
    //     </>
    // );

