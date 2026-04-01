# 🛒 E-commerce API

An Express.js backend application designed to handle e-commerce processes. The system manages the order lifecycle within a MySQL database and integrates the Tpay external payment gateway.

<br>

Copyright (c) 2026 [Patryk Piotrowski](https://github.com/Xdellta). All rights reserved.

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tpay](https://img.shields.io/badge/Tpay-00529B?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

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

> [!IMPORTANT]
> ### Database Setup
> Use the provided `[schema.sql](./schema.sql)` file to manually generate the database structure, triggers, and initial data.

<br>

### Installation & Execution

```sh
# Install packages
npm install
```

```sh
# Run in development mode (with nodemon)
npm run dev
```

```sh
# Start in production mode
npm start
```

<br>

## 🔌 API Endpoints

> [!NOTE]
> **POST:** `/api/order/create`<br>
> **Description:** `Adds the order to the database and returns a payment link.`
>
> <details>
> <summary><b>REQUEST:</b></summary>
> <br>
>
> ```json
> {
>     "name": "John Doe",
>     "email": "client@example.com",
>     "items": [
>         {
>             "id": 1,
>             "quantity": 1
>         },
>         {
>             "id": 2,
>             "quantity": 13
>         }
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
>     "status": "Success",
>     "data": {
>         "paymentLink": "[https://secure.example.com/payment/TR-XXXX-XXXXX](https://secure.example.com/payment/TR-XXXX-XXXXX)"
>     }
> }
> ```
> </details>

<br>

> [!NOTE]
> **POST:** `/api/order/tpay-webhook`<br>
> **Description:** `It retrieves the payment confirmation message from Tpay and updates the order status in the database.`
>
> <details>
> <summary><b>REQUEST:</b></summary>
> <br>
>
> ```json
> {
>     "tr_crc": "14",
>     "tr_status": "TRUE"
> }
> ```
> </details>
>
> **RESPONSE (201):** `TRUE`

<br>

## ⚠️ Error Codes

The API uses standard HTTP status codes. Common error responses:

| Status | Error Code | Description |
| :---: | :---: | :--- |
| 400 | `BAD_REQUEST` | The request is invalid or missing required data. |
| 400 | `VALIDATION_ERROR` | One or more fields failed validation. |
| 401 | `UNAUTHORIZED` | Authentication required. Please log in. |
| 403 | `FORBIDDEN` | Access denied. You do not have permission for this action. |
| 404 | `NOT_FOUND` | The requested resource could not be found. |
| 409 | `CONFLICT` | This record already exists in our system. |
| 500 | `INTERNAL_SERVER_ERROR` | Something went wrong on our end. |
| 500 | `DEFAULT` | An unexpected error occurred. Please try again later. |
