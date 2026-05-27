import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Text({ content } : { content: string }) {
  return (
    <Section style={s.section}>
      <p style={s.p}>{ content }</p>
    </Section>
  );
}

const s = {
  section: { padding: '10px 28px' },

  p: { 
    fontSize: style.theme.fontSize.base,
    color: style.theme.color.primary
  },
};