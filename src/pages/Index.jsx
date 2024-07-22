import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KanbanColumn from "./KanbanColumn";
import Header from "./Header";

const initialData = {
  columns: [
    { id: "todo", title: "To Do", cards: [
      { id: "card1", title: "Task 1", description: "Complete the project proposal" },
      { id: "card2", title: "Task 2", description: "Review client feedback" },
    ]},
    { id: "inprogress", title: "In Progress", cards: [
      { id: "card3", title: "Task 3", description: "Implement new feature" },
    ]},
    { id: "done", title: "Done", cards: [
      { id: "card4", title: "Task 4", description: "Submit weekly report" },
    ]},
  ],
};

const Index = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = data.columns.find(col => col.id === source.droppableId);
    const destColumn = data.columns.find(col => col.id === destination.droppableId);
    const draggedCard = sourceColumn.cards[source.index];

    setData(prevData => {
      const newColumns = prevData.columns.map(col => {
        if (col.id === source.droppableId) {
          col.cards.splice(source.index, 1);
        }
        if (col.id === destination.droppableId) {
          col.cards.splice(destination.index, 0, draggedCard);
        }
        return col;
      });
      return { ...prevData, columns: newColumns };
    });
  };

  const addColumn = () => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: "New Column",
      cards: [],
    };
    setData(prevData => ({
      ...prevData,
      columns: [...prevData.columns, newColumn],
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-x-auto p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <ResizablePanelGroup direction="horizontal">
            {data.columns.map((column, index) => (
              <ResizablePanel key={column.id} defaultSize={100}>
                <KanbanColumn column={column} index={index} />
              </ResizablePanel>
            ))}
          </ResizablePanelGroup>
        </DragDropContext>
        <Button onClick={addColumn} className="mt-4">
          <Plus className="mr-2 h-4 w-4" /> Add Column
        </Button>
      </main>
    </div>
  );
};

export default Index;