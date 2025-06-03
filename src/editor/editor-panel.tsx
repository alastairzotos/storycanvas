import type React from "react";
import { useStoryCanvas } from "./context";
import { PropsEditor } from "./props-editor";

export const EditorPanel: React.FC = () => {
  const { stories, selected, updateSelectedArgs } = useStoryCanvas();

  if (!selected) return null;

  return (
    <PropsEditor
      story={stories[selected.type]}
      values={selected.args}
      onChange={updateSelectedArgs}
    />
  )
}