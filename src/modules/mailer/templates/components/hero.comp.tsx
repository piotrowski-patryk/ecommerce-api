import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Hero({ title, text } : { title: string, text: string }) {
  return (
    <Section style={s.section}>
      <h1 style={style.global.h1}>{title }</h1>
      <p style={s.p}>{ text }</p>
    </Section>
  );
}

const s = {
  section: { padding: '10px 28px' },

  p: {
    fontSize: style.theme.fontSize.base,
    color: style.theme.color.secondary,
    textAlign: 'center'
  }
};