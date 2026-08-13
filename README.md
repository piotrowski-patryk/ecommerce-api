# 🛒 E-commerce API

An Express backend application designed to handle e-commerce processes. The system manages the order lifecycle in PostgreSQL and integrates the Tpay payment gateway.

<br>

Copyright (c) 2026 [Patryk Piotrowski](https://github.com/Xdellta). All rights reserved.

<br>

![Node](https://img.shields.io/badge/node-24.15.0-6DA55F?style=flat-square&logo=node&logoColor=white)
![Express](https://img.shields.io/badge/express-5.2.1-%23404d59.svg?style=flat-square&logo=express&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-3982CE?style=flat-square&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-6.0.3-%233178C6.svg?style=flat-square&logo=typescript&logoColor=white)
![React Email](https://img.shields.io/badge/react--email-6.1.5-%23000?style=flat-square&logo=react)
![Tpay](https://img.shields.io/badge/Tpay-ED1C24?style=flat-square)

<br>

## ⚙️ Configuration

> [!IMPORTANT]
> ### Environment Variables
> The application requires a `.env` file. Use the provided `[.env.example](./.env.example)` as a template.
> Copy the example file and fill in your credentials:
> ```sh
> cp .env.example .env
> ```

<br>

### Installation & Execution

```sh
# Install dependencies
npm install
```

```sh
# Generate Prisma Client
npx prisma generate
```

```sh
# Start development server
npm run dev
```

<br>

## 🔌 API Endpoints

> [!NOTE]
> **POST:** `/api/orders`<br>
> **Description:** `Adds the order to the database and returns a payment link.`
>
> <details>
> <summary><b>REQUEST:</b></summary>
> <br>
>
> ```json
> {
>     "client": {
>         "name": "John Doe",
>         "email": "client@example.com",
>     },
>     "items": [
>         { "productId": "product-variant-uuid", "quantity": 1 },
>         { "productId": "another-product-variant-uuid", "quantity": 13 }
>     ]
> }
> ```
> </details>
>
> <details>
> <summary><b>RESPONSE (201):</b></summary>
> <br>
>
> ```json
> {
>     "success": true,
>     "data": {
>         "paymentUrl": "https://secure.example.com/payment/TR-XXXX-XXXXX"
>     }
> }
> ```
> </details>

<br>

> [!NOTE]
> **POST:** `/api/payments/webhook-tpay`<br>
> **Description:** `It retrieves the payment confirmation message from Tpay and updates the order status in the database.`
>
> <details>
> <summary><b>REQUEST:</b></summary>
> <br>
>
> ```json
> {
>     "tr_crc": "3d59c2b7-7977-433a-bca3-2d1937c1dc3a",
>     "tr_paid": "200",
>     "tr_status": "TRUE"
> }
> ```
> </details>
>
> **RESPONSE (200):** `TRUE`

<br>

## ⚠️ Error Codes

The API uses standard HTTP status codes. Common error responses:

| Status | Error Code | Description |
| :---: | :--- | :--- |
| 400 | `BAD_REQUEST` | Bad Request |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Not Found |
| 409 | `CONFLICT` | Conflict |
| 422 | `UNPROCESSABLE_ENTITY` | Unprocessable Entity |
| 500 | `INTERNAL_SERVER_ERROR` | Internal Server Error |
| 502 | `BAD_GATEWAY` | Bad Gateway |
