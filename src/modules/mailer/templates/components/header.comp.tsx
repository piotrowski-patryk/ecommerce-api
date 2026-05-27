import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';
import config from '#/config/index.js';

export default function Header() {
  return (
    <Section style={s.section}>
      <img
        src={config.store.logoUrl}
        alt="Logo"
        style={s.image}
      />
    </Section>
  );
}

const s = {
  section: { 
    padding: '10px 28px'
   },

   image: {
    width: '200px',
    height: 'auto',
   }
};