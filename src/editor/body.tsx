import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type React from "react";
import { useStoryCanvas } from "./context";
import { ElementComponent } from "./element-component";
import { ElementWrapper } from "./element-wrapper";
import styled from "styled-components";

const OverlayWrapper = styled.div({
  cursor: 'grab',
})

export const StoryCanvasBody: React.FC = () => {
  const { body, order, elements, draggingElement, selectElement, setDraggingElement, setOrder } = useStoryCanvas();
  const sensors = useSensors(useSensor(PointerSensor));

  const Body = body!;

  return (
    <div onClick={() => selectElement()} style={{ height: '100%' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          setDraggingElement(elements[active.id]);
        }}
        onDragEnd={({ active, over }) => {
          setDraggingElement();
          if (over && active.id !== over.id) {
            const oldIndex = order.indexOf(active.id as string);
            const newIndex = order.indexOf(over.id as string);
            setOrder(arrayMove(order, oldIndex, newIndex));
          }
        }}
        onDragCancel={() => setDraggingElement()}
      >
        <Body>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            {order.map(id => <ElementWrapper key={id} element={elements[id]} />)}
          </SortableContext>
        </Body>

        <DragOverlay>
          {draggingElement
            ? (
              <OverlayWrapper>
                <ElementComponent element={draggingElement} />
              </OverlayWrapper>
            )
            : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
