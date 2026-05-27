import * as React from 'react';
import { Section } from '@react-email/components';
import style from '../styles/index.js';
import { CURRENCY_CODES } from '#/common/constants/index.js';

export interface TableItem {
  id: string;
  name: string;
  quantity: number;
  priceGross: number;
}

interface TableProps {
  currency: string;
  amount: number,
  items: TableItem[];
}

export default function ProductTable({ currency, amount, items }: TableProps) {

  const symbol = (CURRENCY_CODES as any)[currency].symbol;

  return (
    <Section style={s.section}>
      <table style={s.table}>
        <thead>
          <tr style={s.head}>
            <th style={{ ...s.th, textAlign: 'left' }}>Produkt</th>
            <th style={{ ...s.th, textAlign: 'center' }}>Ilość</th>
            <th style={{ ...s.th, textAlign: 'right' }}>Cena</th>
            <th style={{ ...s.th, textAlign: 'right' }}>Suma</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} style={s.row}>
              <td style={s.td}>{i.name}</td>
              <td style={{ ...s.td, textAlign: 'center' }}>{i.quantity}</td>
              <td style={{ ...s.td, textAlign: 'right' }}>{i.priceGross.toFixed(2)} {symbol}</td>
              <td style={{ ...s.td, textAlign: 'right', ...s.price }}>{(i.quantity * i.priceGross).toFixed(2)} {symbol}</td>
            </tr>
          ))}

          <tr>
            <td colSpan={3} style={{ ...s.td, textAlign: 'right', fontWeight: '700' }}>
              Razem:
            </td>
            <td style={{ ...s.td, textAlign: 'right', ...s.price, borderTop: '2px solid ' + style.theme.color.border }}>
              {amount.toFixed(2)} {symbol}
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

// Style
const s = {
  section: { padding: '10px 20px' },

  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },

  head: { borderBottom: '2px solid' + style.theme.color.border },
  
  th: { 
    padding: '12px 8px', 
    fontSize: style.theme.fontSize.xs,
    textTransform: 'uppercase' as const, 
    color: style.theme.color.secondary, 
    fontWeight: '600' 
  },

  row: { borderBottom: '1px solid' + style.theme.color.border },

  td: {
    padding: '16px 8px',
    fontSize: style.theme.fontSize.sm,
    color: style.theme.color.primary
  },

  price: { fontWeight: '600' }
};