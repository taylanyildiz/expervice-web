import * as React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

export type DraggableListProps = {
  items: any[];
  onDragEnd: OnDragEndResponder;
};

const DraggableListItem = (props: { item: any; index: number }) => {
  const { item, index } = props;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, _) => (
        <p
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        ></p>
      )}
    </Draggable>
  );
};

const DraggableList = React.memo(({ items, onDragEnd }: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
