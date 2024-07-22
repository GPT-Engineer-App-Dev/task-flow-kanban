import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const KanbanColumn = ({ column, index }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-grow overflow-y-auto"
          >
            {column.cards.map((card, cardIndex) => (
              <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                  >
                    <CardHeader>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{card.description}</p>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button className="mt-2">
        <Plus className="mr-2 h-4 w-4" /> Add Card
      </Button>
    </div>
  );
};

export default KanbanColumn;