import type React from "react";
import { useStoryCanvas } from "./context";
import type { StoryElement } from "./types";

interface Props {
  element: StoryElement;
}

export const ElementComponent: React.FC<Props> = ({ element }) => {
  const { stories } = useStoryCanvas();

  const Component = stories[element.type]?.component;

  if (!Component) return;

  return <Component {...element.args} />;
}
