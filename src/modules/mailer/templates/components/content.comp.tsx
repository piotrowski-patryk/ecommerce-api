import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Content({ title, text } : { title: string, text: string }) {
  return (
    <Section style={s.section}>
      <h2 style={style.global.h2}>{title }</h2>
      <p style={style.global.p}>{ text }</p>
    </Section>
  );
}

const s = {
  section: { padding: '10px 28px' },
};