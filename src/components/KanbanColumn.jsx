import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SortableTask = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id, data: { type: "task" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab"
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.content}</p>
      </CardContent>
    </Card>
  );
};

export const KanbanColumn = ({ column, tasks }) => {
  return (
    <div className="bg-secondary p-4 rounded-lg h-full flex flex-col">
      <h2 className="font-semibold mb-4">{column.title}</h2>
      <div className="flex-grow overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </div>
      <Button className="w-full mt-4">Add Card</Button>
    </div>
  );
};