import type React from "react";
import { useStoryCanvas } from "./context";
import styled from "styled-components";

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: 12,
})

export const StoryPanel: React.FC = () => {
  const { stories, addElement } = useStoryCanvas();

  return (
    <Wrapper>
      <h3>Elements</h3>
      {Object.keys(stories).map((storyName) => (
        <button
          key={storyName}
          onClick={() => addElement({ type: storyName, args: stories[storyName].args || {} })}
        >
          {storyName}
        </button>
      ))}
    </Wrapper>
  )
}
