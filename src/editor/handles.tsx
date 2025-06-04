import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type React from "react";
import styled from "styled-components"

const Handle = styled.div({
  position: 'absolute',
  top: 4,
  width: 20,
  height: 20,
  background: '#ccd',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
})

const DragHandle = styled(Handle)({
  right: 26,
  cursor: 'grab',
})

const CloseHandle = styled(Handle)({
  right: 4,
  cursor: 'pointer'
})

interface Props {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  onDelete?: () => void;
}

export const Handles: React.FC<Props> = ({ attributes, listeners, onDelete }) => {
  return (
    <>
      <DragHandle
        {...attributes}
        {...listeners}
        onPointerDown={e => {
          e.stopPropagation();
          listeners?.onPointerDown(e);
        }}
      >
        ≡
      </DragHandle>

      <CloseHandle
        onClick={onDelete}
      >
        x
      </CloseHandle>
    </>
  )
}