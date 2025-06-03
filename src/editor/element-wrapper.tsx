import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import { useStoryCanvas } from "./context";
import { ElementComponent } from "./element-component";
import type { StoryElement } from "./types";


interface Props {
  element: StoryElement;
}

export const ElementWrapper: React.FC<Props> = ({ element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: element.id });

  const { selected, selectElement, draggingElement } = useStoryCanvas();

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    boxShadow: selected?.id === element.id ? "0 4px 8px rgba(0,0,0,0.1)" : undefined,
    opacity: draggingElement?.id === element.id ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={e => {
        selectElement(element);

        listeners?.onPointerDown(e);
      }}
    >
      <ElementComponent element={element} />
    </div>
  );
}
