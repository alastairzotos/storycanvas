import type React from "react";
import { useStoryCanvas } from "./context";
import type { StoryElement } from "./types";
import styled from "styled-components";

const Wrapper = styled.div<{ selected: boolean }>(({ selected }) => ({
  outline: selected ? '1px dashed rgba(0, 0, 0, 0.3)' : undefined,
}))

interface Props {
  element: StoryElement;
}

export const ElementComponent: React.FC<Props> = ({ element }) => {
  const { stories, selected } = useStoryCanvas();

  const Component = stories[element.type]?.component;

  if (!Component) return;

  return (
    <Wrapper selected={selected?.id === element.id}>
      <Component {...element.args} />
    </Wrapper>
  );
}
