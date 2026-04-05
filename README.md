# Gemini Clone

A clean React + Vite chat interface powered by the Google Gemini API.

This project recreates the feel of the Gemini UI with a responsive sidebar, prompt history, animated response rendering, and a simple local setup for experimenting with Gemini models in the browser.

## Preview

- Gemini-inspired chat layout
- Collapsible sidebar with recent prompt history
- Streaming-style typing animation for responses
- Prompt history persisted in `localStorage`
- Gemini model fallback handling for quota-related failures
- Fast frontend workflow with Vite

## Tech Stack

- React
- Vite
- Google Gen AI SDK (`@google/genai`)
- CSS

## Features

- Send prompts to Gemini from a lightweight chat UI
- View previous prompts from the sidebar and reload earlier conversations
- Store prompt/response history in the browser
- Format Gemini responses for improved readability
- Show helpful messages for missing API keys or exhausted free-tier quota

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd gemini-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Copy `.env.example` to `.env.local` and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

You can also use:

```env
VITE_GOOGLE_API_KEY=your_google_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## Project Structure

```text
src/
  assets/               Static icons and images
  components/
    sidebar/
      Main/             Main chat panel
      Sidebar.jsx       Sidebar and recent prompts
  config/
    gemini.js           Gemini API integration and fallback model logic
  context/
    context.jsx         Shared chat state and prompt history handling
  App.jsx               Root layout
```

## Environment Notes

- The app reads the API key from `VITE_GEMINI_API_KEY` first.
- If that is not set, it falls back to `VITE_GOOGLE_API_KEY`.
- Prompt history is stored locally in the browser and is not synced to a backend.

## Current Scope

This project is focused on the core chat experience. Some UI controls, like gallery and microphone icons, are currently visual-only and not yet connected to extra functionality.

