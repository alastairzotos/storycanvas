import type { Meta } from "@storybook/react-vite";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import type { StoryElement } from "./types";

interface Props {
  stories: Record<string, Meta>;
  body?: React.FC<React.PropsWithChildren<any>>;
}

interface ContextProps extends Props {
  selected?: StoryElement;
  elements: Record<string, StoryElement>;
  draggingElement?: StoryElement;
  order: string[];

  addElement: (element: Omit<StoryElement, 'id'>) => void;
  deleteElement: (element: StoryElement) => void;
  selectElement: (element?: StoryElement) => void;
  updateSelectedArgs: (args: Record<string, any>) => void;
  setDraggingElement: (element?: StoryElement) => void;
  setOrder: (ids: string[]) => void;
}

const StoryCanvasContext = createContext<ContextProps>({
  stories: {},
  elements: {},
  order: [],

  addElement: () => { },
  deleteElement: () => { },
  selectElement: () => { },
  updateSelectedArgs: () => { },
  setDraggingElement: () => { },
  setOrder: () => { },
});

export const StoryCanvasProvider: React.FC<React.PropsWithChildren<Props>> = ({
  stories,
  body = ({ children }) => <>{children}</>,
  children,
}) => {
  const [elements, setElements] = useState<Record<string, StoryElement>>({});
  const [selected, selectElement] = useState<StoryElement | undefined>();
  const [draggingElement, setDraggingElement] = useState<StoryElement | undefined>();
  const [order, setOrder] = useState<string[]>([]);

  const props: ContextProps = {
    body,
    stories,
    selected,
    elements,
    draggingElement,
    order,

    addElement: (element) => {
      const id = uuid();

      setElements({
        ...elements,
        [id]: {
          id,
          ...element,
        }
      });

      setOrder([...order, id]);
    },
    deleteElement: (element) => {
      const copy = { ...elements };
      delete copy[element.id];
      setElements(copy);
      setOrder(order.filter(elId => elId !== element.id));
    },
    selectElement,
    updateSelectedArgs: (args) => {
      if (selected) {
        selectElement({ ...selected!, args });
        setElements({
          ...elements,
          [selected.id]: {
            ...elements[selected.id],
            args,
          }
        })
      }
    },
    setDraggingElement,
    setOrder,
  }

  return (
    <StoryCanvasContext.Provider value={props}>
      {children}
    </StoryCanvasContext.Provider>
  )
}

export const useStoryCanvas = () => useContext(StoryCanvasContext);
