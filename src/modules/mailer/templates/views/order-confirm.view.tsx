import * as React from 'react';
import Main from '../layouts/main.layout.js';
import Hero from '../components/hero.comp.js';
import Divider from '../components/divider.comp.js';
import Text from '../components/text.comp.js';
import Spacer from '../components/spacer.comp.js';
import ProductTable from '../components/product-table.comp.js';
import Content from '../components/content.comp.js';

interface OrderConfirmProps {
  number: number
  currency: string
  amount: number
  items: Array<{ id: string; name: string; quantity: number; priceGross: number }>
}

export default function OrderConfirm(data: OrderConfirmProps) {

  return (
    <Main>
      <Hero
        title="Zamówienie zostało przyjęte!"
        text={ `Twoje zamówienie otrzymało numer #${data.number}` }
      />

      <Divider />

      <Text 
        content="Dziękujemy za zakup! Wkrótce otrzymasz informację o postępie zamówienia."
      />

      <Spacer />

      <ProductTable
        currency={ data.currency }
        amount={ data.amount }
        items={ data.items }
      />

      <Content
        title="Masz pytania?"
        text="Skontaktuj się z naszym działem obsługi klienta, odpowiemy na wszystkie Twoje pytania."
      />
    </Main>
  );
}
