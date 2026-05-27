# 🛒 E-commerce API

An Express backend application designed to handle e-commerce processes. The system manages the order lifecycle within a MySQL database and integrates the Tpay external payment gateway.

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
> **POST:** `/api/order/`<br>
> **Description:** `Adds the order to the database and returns a payment link.`
>
> <details>
> <summary><b>REQUEST:</b></summary>
> <br>
>
> ```json
> {
>     "customer": {
>         "name": "John Doe",
>         "email": "client@example.com",
>     },
>     "items": [
>         { "id": 1, "quantity": 1 },
>         { "id": 2, "quantity": 13 }
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
>         "paymentLink": "[https://secure.example.com/payment/TR-XXXX-XXXXX](https://secure.example.com/payment/TR-XXXX-XXXXX)"
>     }
> }
> ```
> </details>

<br>

> [!NOTE]
> **POST:** `/api/order/webhook-tpay`<br>
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
| 400 | `INVALID_ARGUMENT` | The provided argument or parameter is invalid, unrecognized, or out of range. |
| 400 | `INVALID_PAYMENT_GATEWAY` | The selected payment gateway is invalid or not supported. |
| 401 | `AUTHENTICATION_FAILED` | The request could not be authenticated. Please check your credentials. |
| 404 | `NOT_FOUND` | The requested resource was not found. |
| 409 | `PRODUCT_NOT_AVAILABLE` | The requested product is currently inactive or unavailable for purchase. |
| 422 | `INVALID_LOGIC_PARAMETERS` | The provided parameters are invalid for this operation. |
| 422 | `CURRENCY_NOT_SUPPORTED` | The specified currency is not supported for this operation. |
| 500 | `INTERNAL_SERVER_ERROR` | An unexpected error occurred. Please try again later. |
| 500 | `CONFIGURATION_ERROR` | The server configuration is invalid or missing required keys. |
| 502 | `PAYMENT_GATEWAY_ERROR` | Payment gateway connection error. Please try again later. |