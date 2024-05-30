# BiteSpeed API 🏎️

Welcome to the BiteSpeed API documentation! This simple and straightforward API provides endpoints for creating contacts and retrieving contact lists. Below you'll find all the information you need to get started.

## 📚 Table of Contents

- [Endpoints](#endpoints)
  - [Create Contact](#create-contact)
  - [Identify Contacts](#identify-contacts)
- [Usage](#usage)
- [Examples](#examples)

## 🚀 Endpoints

### 1. Create Contact

To create a new contact, use the following endpoint:

**Query Parameters:**

- `email` (string): The email address of the contact.
- `phoneNumber` (string): The phone number of the contact.

**Example Request:**

    GET /create-contact?email=john.doe@example.com&phoneNumber=%2B1234567890

**Response:**

```json
{
  "message": "created successfully",
  "data": []
}
```
