import type { TaskData } from "../types";
import Task from "./Task";

type TaskListProps  ={
    /**Checks if its in loading state */
    loading?:boolean;
    /**Tbhe list of the task to pinned */
    tasks : TaskData[];
    onPinTask:(id:string) => void;
    /**event to change the task to pinned */
    onArchiveTask:(id:string) => void;
    
};


export  default function TaskList({
    loading = false,
    tasks,
    onPinTask,
    onArchiveTask,}: TaskListProps){
        const events = {
            onPinTask,
            onArchiveTask
        };

        if(loading){
            return <div className="list-items">loading</div>
        }

        if(tasks.length === 0){
            return <div className="list-items">empty</div>
        }

        return (<div className="list-items">
            {tasks.map((task)=> (
                <Task key={task.id} task={task} {...events}/>
            ))}
        </div>
        );

    }

    
 