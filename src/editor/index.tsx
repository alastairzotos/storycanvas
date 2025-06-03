import type { Meta } from "@storybook/react-vite";
import type React from "react";
import { convert, ThemeProvider, themes } from 'storybook/internal/theming';
import styled from "styled-components";
import { StoryCanvasProvider } from "./context";
import { StoryPanel } from "./story-panel";
import { StoryCanvasBody } from "./body";
import { EditorPanel } from "./editor-panel";

interface Props {
  stories: Record<string, Meta>;
  body?: React.FC<React.PropsWithChildren<any>>;
}

const Wrapper = styled.div({
  display: 'flex',
  height: '100vh',
})

const StoryList = styled.div({
  width: '20%',
  backgroundColor: '#eee',
})

const Body = styled.div({
  width: '50%',
})

const ControlsPanel = styled.div({
  width: '30%',
  backgroundColor: '#eee',
})

export const StoryCanvas: React.FC<Props> = ({ stories, body }) => {
  return (
    <ThemeProvider theme={convert(themes.light)}>
      <StoryCanvasProvider stories={stories} body={body}>
        <Wrapper>
          <StoryList>
            <StoryPanel />
          </StoryList>
          <Body>
            <StoryCanvasBody />
          </Body>
          <ControlsPanel>
            <EditorPanel />
          </ControlsPanel>
        </Wrapper>
      </StoryCanvasProvider>
    </ThemeProvider>
  )
}
