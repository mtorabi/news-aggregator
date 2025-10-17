# 📰 News Aggregator Frontend

A simple React + TypeScript web app scaffolded for the Innoscripta AG frontend challenge. This project is containerized using Docker and served via Nginx.

## 🚀 Getting Started

### Prerequisites

- Node.js (for local development)
- Docker (for containerized deployment)

### Local Development

```bash
npm install
npm start
```

App runs at http://localhost:3000

### 🐳 Docker Setup

#### Build the Docker image

```bash
docker build -t news-aggregator .
```

#### Run the container

```bash
docker run -p 3000:80 news-aggregator
```

App will be available at http://localhost:3000

## 📁 Project Structure

```code
news-aggregator/
    ├── Dockerfile
    ├── public/
    ├── src/
    ├── package.json
    └── ...
```

## 📌 Notes

Built with React + TypeScript