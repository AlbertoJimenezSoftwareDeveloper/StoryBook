import type { TaskData } from "../types";
import Task from "./Task";

type TaskListProps = {
    /**Checks if its in loading state */
    loading?: boolean;
    /**Tbhe list of the task to pinned */
    tasks: TaskData[];
    onPinTask: (id: string) => void;
    /**event to change the task to pinned */
    onArchiveTask: (id: string) => void;

};


export default function TaskList({
    loading = false,
    tasks,
    onPinTask,
    onArchiveTask, }: TaskListProps) {
    const events = {
        onPinTask,
        onArchiveTask
    };
    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span><span>cool</span><span>state</span>
            </span>
        </div>
    );

    if (loading) {
        return 
        (
        <div className="list-items"
        data-testid="loading"
        key={"loading"}>
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="list-items"
            key={"empty"}
            data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check"/>
                    <p className="title-message">You have no task</p>
                    <p className="subtitle-message">sit back and relax</p>
                </div>
                </div>
        );
    }

    const tasksInOrder = [
        ...tasks.filter((t) => t.state == "TASK_PINNED"),
        ...tasks.filter((t) => t.state != "TASK_PINNED"),
    ];

    return (<div className="list-items">
        {tasksInOrder.map((task) => (
            <Task key={task.id} task={task} {...events} />
        ))}
    </div>
    );

}


