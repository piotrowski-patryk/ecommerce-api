import * as React from 'react';
import { Html, Head, Body, Container, Preview, Section } from '@react-email/components';
import type { ReactNode } from 'react';
import style from '../styles/index.js';
import Header from '../components/header.comp.js';
import Footer from '../components/footer.comp.js';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <Html>
      <Head/>
      <Preview>Tekst podglądu</Preview>
      <Body style={style.global.body}>

        <Container style={style.global.container}>
          <Header />
          {children}
          <Footer />
        </Container>

      </Body>
    </Html>
  );
}