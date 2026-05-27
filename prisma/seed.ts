import database from '#/database/index';

async function main() {
  await database.product.createMany({
    data: [
      { 
        name:       'Myszka bezprzewodowa', 
        currency:   'PLN', 
        priceNet:   100.00, 
        priceGross: 123.00, 
        vatRate:    23, 
        status:     'AVAILABLE' 
      },
      { 
        name:       'Klawiatura mechaniczna', 
        currency:   'PLN', 
        priceNet:   200.00, 
        priceGross: 246.00, 
        vatRate:    23, 
        status:     'AVAILABLE' 
      },
      { 
        name:       'Podkładka pod mysz XXL', 
        currency:   'PLN', 
        priceNet:   50.00, 
        priceGross: 61.50, 
        vatRate:    23, 
        status:     'AVAILABLE' 
      }
    ]
  });
}

main().then(() => database.$disconnect());