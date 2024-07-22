import { Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const KanbanColumn = ({ column, tasks, provided }) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="bg-secondary p-4 rounded-lg h-full flex flex-col"
    >
      <h2 className="font-semibold mb-4">{column.title}</h2>
      <div className="flex-grow overflow-y-auto space-y-2">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="mb-2"
              >
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{task.content}</p>
                </CardContent>
              </Card>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
      <Button className="w-full mt-4">Add Card</Button>
    </div>
  );
};