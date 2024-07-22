import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { UserNav } from "@/components/UserNav";
import { KanbanColumn } from "@/components/KanbanColumn";
import { Package2 } from "lucide-react";

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-4", "task-5"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-6"],
    },
  },
  tasks: {
    "task-1": { id: "task-1", title: "Task 1", content: "Content for Task 1" },
    "task-2": { id: "task-2", title: "Task 2", content: "Content for Task 2" },
    "task-3": { id: "task-3", title: "Task 3", content: "Content for Task 3" },
    "task-4": { id: "task-4", title: "Task 4", content: "Content for Task 4" },
    "task-5": { id: "task-5", title: "Task 5", content: "Content for Task 5" },
    "task-6": { id: "task-6", title: "Task 6", content: "Content for Task 6" },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Index = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newData);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <Package2 className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Kanban Board</h1>
        </div>
        <UserNav />
      </header>
      <main className="flex-grow overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <ResizablePanelGroup direction="horizontal" className="min-h-full">
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <ResizablePanel key={column.id} defaultSize={33}>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <KanbanColumn
                        column={column}
                        tasks={tasks}
                        provided={provided}
                      />
                    )}
                  </Droppable>
                </ResizablePanel>
              );
            })}
          </ResizablePanelGroup>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Index;