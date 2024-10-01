# Points Calculator

## Overview

This project is a server application that utilizes Docker Compose to set up both the server and MongoDB database. It provides a RESTful API for managing receipts with CRUD operations and a special route for handling points associated with receipts.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   
2. Environment Variables:
    To run this project, you need to configure the following environment variables in a `.env` file:
    ```env
    
      # Server Configuration
      PORT=<your_port>
    
      # MongoDB Configuration
      MONGO_USER=<your_mongo_username>
      MONGO_PASSWORD=<your_mongo_password>
      MONGO_HOST=<your_mongo_host>
      MONGO_PORT=<your_mongo_port>
      MONGO_DB_NAME=<your_mongo_database_name>

3. Start the application
    ```bash
    docker-compose up
    
4. Access the server at:
    ```bash
        http://localhost:<your_port>
        
### API Routes

#### Receipts

- `GET /receipts`
  - Get all receipts
  
- `GET /receipts/:id`
  - Get a receipt by ID
  
- `GET /receipts/:id/points`
  - Get points for a receipt by ID
  
- `POST /receipts`
  - Create a new receipt
  
- `PUT /receipts/:id`
  - Update a receipt by ID
  
- `DELETE /receipts/:id`
  - Delete a receipt by ID
