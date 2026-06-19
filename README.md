# AI Cold Email & Proposal Generator

A web app for freelancers and small sales teams. Enter a few details about a prospect and get a tailored cold email or structured proposal written by an LLM. Choose from three copywriting frameworks (PAS, AIDA, BAB) and three tones. The proposal output is fully editable in the browser before you copy it.

Built with Next.js 15, Tailwind CSS, and a provider-agnostic LLM layer that works with any OpenAI-compatible API endpoint.

---

## Running locally

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Clone the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Copy the example env file and fill in your API key
cp .env.example .env.local
# Edit .env.local — add at minimum LLM_API_KEY (see provider table below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## LLM configuration

The app uses a **provider-agnostic layer**: point three environment variables at any OpenAI-compatible endpoint and the app works without any code changes.

| Variable | Purpose |
|---|---|
| `LLM_BASE_URL` | Base URL of your provider's OpenAI-compatible endpoint |
| `LLM_API_KEY` | API key for that provider |
| `LLM_MODEL` | Model identifier string |
| `LLM_FALLBACK_BASE_URL` | *(optional)* Fallback provider — used automatically if the primary fails or rate-limits |
| `LLM_FALLBACK_API_KEY` | API key for the fallback provider |
| `LLM_FALLBACK_MODEL` | Model identifier for the fallback provider |

### Provider reference

| Provider | `LLM_BASE_URL` | `LLM_MODEL` example | Free tier |
|---|---|---|---|
| **Google Gemini** (default) | `https://generativelanguage.googleapis.com/v1beta/openai` | `gemini-2.0-flash` | Yes — [aistudio.google.com](https://aistudio.google.com) |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` | Yes — [console.groq.com](https://console.groq.com) |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` | No |
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` | Credits on signup |
| OpenRouter | `https://openrouter.ai/api/v1` | `google/gemini-2.0-flash-exp:free` | Yes — many free models |
| Ollama (local) | `http://localhost:11434/v1` | `llama3.2` | n/a — runs on your machine |

**Recommended default:** `gemini-2.0-flash` via Google AI Studio. It has a generous free tier, handles the structured proposal JSON reliably, and produces noticeably better copy than the lighter `gemini-2.0-flash-lite`. If you swap in a smaller or weaker model you will see degraded output quality — the prompts are tuned for a capable instruction-following model.

**Recommended fallback:** Groq with `llama-3.3-70b-versatile`. It is fast, free, and covers rate-limit spikes on the primary.

### Minimal `.env.local` (Gemini primary, Groq fallback)

```env
LLM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
LLM_API_KEY=your_gemini_api_key
LLM_MODEL=gemini-2.0-flash

LLM_FALLBACK_BASE_URL=https://api.groq.com/openai/v1
LLM_FALLBACK_API_KEY=your_groq_api_key
LLM_FALLBACK_MODEL=llama-3.3-70b-versatile
```

---

## Deploying to Vercel (free)

### Step 1 — Push your code to GitHub

If you have not already pushed, create a repository on GitHub and push:

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### Step 2 — Connect the repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create a free account).
2. Click **Add New > Project**.
3. Import your GitHub repository. Vercel detects Next.js automatically — no build settings need to change.

### Step 3 — Add environment variables

Before clicking **Deploy**, open the **Environment Variables** section and add:

| Name | Value |
|---|---|
| `LLM_BASE_URL` | `https://generativelanguage.googleapis.com/v1beta/openai` |
| `LLM_API_KEY` | Your Gemini API key |
| `LLM_MODEL` | `gemini-2.0-flash` |
| `LLM_FALLBACK_BASE_URL` | `https://api.groq.com/openai/v1` |
| `LLM_FALLBACK_API_KEY` | Your Groq API key |
| `LLM_FALLBACK_MODEL` | `llama-3.3-70b-versatile` |

You can set the environment to **Production**, **Preview**, and **Development** for all of them.

### Step 4 — Deploy

Click **Deploy**. Vercel builds and deploys in about a minute. Your app is live at `your-project.vercel.app`.

Every subsequent `git push` to `main` triggers an automatic redeployment.

---

## Project structure

```
app/                  Next.js App Router pages and API routes
  api/generate/       Streaming SSE endpoint — the only place LLM calls happen
components/           UI only — no business logic, no direct API calls
lib/
  llm/                Provider-agnostic LLM layer (Gemini/Groq/any OpenAI-compat)
  prompt-engine/      Prompt construction: frameworks, tones, few-shot examples
  types.ts            Single source of truth for all shared TypeScript types
```

All LLM calls run server-side in `app/api/generate/route.ts`. API keys are read from `process.env` at request time and are never sent to the browser.
