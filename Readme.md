# Quiz App

A simple Quiz Application built using HTML, CSS, and JavaScript for the frontend
and Deno with the Hono framework for the backend.

The application allows users to attempt multiple-choice questions (MCQs),
navigate through them, submit their answers, and receive a score calculated by
the backend.

This project is built to practice end-to-end web application development,
including frontend state management and client–server communication.

# Features

Multiple Choice Questions (MCQs)

Dynamic question rendering

Navigation between quiz questions

Answer selection and submission

Backend evaluation of answers

Score calculation and result display

Fetching quiz questions from the server

# Architecture

The application follows a client–server architecture.

## Frontend

Requests quiz questions from the backend.

Dynamically renders questions using DOM manipulation.

### Maintains quiz state:

1. current question index

2. selected answers

Sends user answers to the backend after the quiz is completed.

## Backend

Serves static frontend files.

Provides API endpoints to fetch quiz questions.

Receives user answers from the frontend.

Evaluates answers and calculates the final score.

Returns the result to the frontend.

# Future Improvements

User login system

Form validation

User progress tracking

Progress card / score history

# Learning Goals

This project helps practice:

DOM manipulation in JavaScript

Managing frontend state

API communication

Backend development using Deno

Using the Hono framework

Structuring a full-stack application
