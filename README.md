## Description

Ordering backend service. Use NestJS Microservices to communicate with the frontend service. use Mongoose to connect to MongoDB. RabbitMQ is used as the message broker. Docker is used to containerize the application. 

# Docker Installation and Setup Guide

## System Requirements

Ensure your system meets the following requirements:

- For Mac: macOS must be version 10.14 or newer. That's Mojave, Catalina, or Big Sur.
- For Windows: Windows 10 64-bit: Pro, Enterprise, or Education (Build 16299 or later). For Windows 10 Home, version 2004 or higher is required.

## Download Docker Desktop

Visit the Docker Hub website and download the Docker Desktop installer for your respective operating system.

## Install Docker Desktop

Run the installer and follow the prompts to install Docker Desktop.

## Verify Installation
Open a terminal window (Command Prompt on Windows, Terminal app on macOS) and run the following command to ensure that you have correctly installed Docker:

```bash
docker version
```

## Run Backend service

```bash
yarn run docker:start
```


## Stay in touch

- Author - [Bk Thomas](https://github.com/bkjonathan)


