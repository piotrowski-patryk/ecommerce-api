import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Section style={s.section}>
      <p style={s.p}>
        &copy; {currentYear}{' '}
        <a href="https://github.com/Xdellta/Xdellta" target="_blank" style={s.link}>
          Patryk Piotrowski
        </a>
        . All rights reserved.
      </p>
    </Section>
  );
}

const s = {
  section: { 
    padding: '10px 28px',
    textAlign: 'center' as const
   },

   p: {
    fontSize: style.theme.fontSize.xs,
    color: style.theme.color.secondary
   },

   link: {
    color: style.theme.color.accent,
    textDecoration: 'none',
    cursor: 'pointer'
   }
};