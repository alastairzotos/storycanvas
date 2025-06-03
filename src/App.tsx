import { StoryCanvas } from './editor'
import Button from './stories/Button.stories';
import Header from './stories/Header.stories';
import './index.css';
import styled from 'styled-components';

const Body = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 12,
})

function App() {
  return (
    <StoryCanvas
      body={Body}
      stories={{
        Header,
        Button,
      }}
    />
  )
}

export default App
