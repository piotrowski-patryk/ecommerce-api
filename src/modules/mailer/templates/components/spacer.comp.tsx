import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Spacer() {
  return (
    <Section style={s.section}></Section>
  );
}

const s = {
  section: { padding: '10px 20px', background: style.theme.background.primary },
};
