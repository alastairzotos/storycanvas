import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import { useState } from "react";
import { useStoryCanvas } from "./context";
import { ElementComponent } from "./element-component";
import { Handles } from "./handles";
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

  const { selected, selectElement, draggingElement, deleteElement } = useStoryCanvas();

  const [hovered, setHovered] = useState(false);

  const isDragging = draggingElement?.id === element.id;

  const style: React.CSSProperties = {
    position: 'relative',
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: selected?.id === element.id ? "0 4px 8px rgba(0,0,0,0.1)" : undefined,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element);
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {hovered && (
        <Handles
          attributes={attributes}
          listeners={listeners}
          onDelete={() => deleteElement(element)}
        />
      )}

      <ElementComponent element={element} />
    </div>
  );
}
