import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Divider() {
  return (
    <Section style={s.section}>
      <div style={s.div}></div>
    </Section>
  );
}

const s = {
  section: { padding: '10px 20px' },

  div: {
    height: '1px',
    width: '100%',
    background: style.theme.color.border
  }
};