import { PureArgsTable } from '@storybook/addon-docs/blocks';
import type { Meta } from '@storybook/react-vite';
import type React from 'react';

interface Props {
  story: Meta;
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
}

export const PropsEditor: React.FC<Props> = ({ story, values, onChange }) => {
  const argTypes = Object.entries(story.argTypes || {})
    .reduce((acc, [key, argType]) => ({
      ...acc,
      [key]: {
        ...argType,
        name: argType?.name || key,
        control: typeof argType?.control === 'string' ? { type: argType.control } : argType?.control,
      }
    }), {});

  return (
    <PureArgsTable
      rows={argTypes}
      args={values}
      updateArgs={a => onChange({ ...values, ...a })}
      compact
    />
  );
}
