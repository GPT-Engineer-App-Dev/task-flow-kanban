import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
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

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((prevData) => {
        const oldColumnId = active.data.current.columnId;
        const newColumnId = over.data.current.columnId;

        const oldColumn = prevData.columns[oldColumnId];
        const newColumn = prevData.columns[newColumnId];

        const oldTaskIds = Array.from(oldColumn.taskIds);
        const newTaskIds = Array.from(newColumn.taskIds);

        const oldIndex = oldTaskIds.indexOf(active.id);
        const newIndex = newTaskIds.indexOf(over.id);

        if (oldColumnId === newColumnId) {
          // Moving within the same column
          const newTaskIds = arrayMove(oldTaskIds, oldIndex, newIndex);
          return {
            ...prevData,
            columns: {
              ...prevData.columns,
              [oldColumnId]: {
                ...oldColumn,
                taskIds: newTaskIds,
              },
            },
          };
        } else {
          // Moving to a different column
          oldTaskIds.splice(oldIndex, 1);
          newTaskIds.splice(newIndex, 0, active.id);
          return {
            ...prevData,
            columns: {
              ...prevData.columns,
              [oldColumnId]: {
                ...oldColumn,
                taskIds: oldTaskIds,
              },
              [newColumnId]: {
                ...newColumn,
                taskIds: newTaskIds,
              },
            },
          };
        }
      });
    }
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
        <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <ResizablePanelGroup direction="horizontal" className="min-h-full">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <ResizablePanel key={column.id} defaultSize={33}>
                  <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
                    <KanbanColumn
                      column={column}
                      tasks={tasks}
                    />
                  </SortableContext>
                </ResizablePanel>
              );
            })}
          </ResizablePanelGroup>
        </DndContext>
      </main>
    </div>
  );
};

export default Index;