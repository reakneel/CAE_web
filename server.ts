import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper for Gemini AI instance
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Summarize Article Endpoint
  app.post("/api/ai/summarize", async (req, res) => {
    try {
      const { content, title } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Article content is required" });
      }

      const ai = getAi();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured in environment.",
          fallback: "This article discusses key concepts and technical insights in detail."
        });
      }

      const prompt = `Analyze the following Markdown article titled "${title || 'Untitled'}".
Provide a concise, engaging 2-3 sentence executive summary that highlights the main key takeaways and core value of the article. Respond in plain text without markdown headers.

Article Content:
${content.slice(0, 8000)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const summary = response.text?.trim() || "No summary generated.";
      res.json({ summary });
    } catch (error: any) {
      console.error("AI Summarize error:", error);
      res.status(500).json({ error: error?.message || "Failed to generate AI summary" });
    }
  });

  // AI Auto-Tag & Category Endpoint
  app.post("/api/ai/categorize", async (req, res) => {
    try {
      const { content, title } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Article content is required" });
      }

      const ai = getAi();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured",
          category: "Tech",
          tags: ["Markdown", "Blog", "Tech"]
        });
      }

      const prompt = `Analyze the following blog post titled "${title || 'Untitled'}".
Extract:
1. One primary category (e.g., Engineering, AI, Design, Development, Life, Thoughts, Architecture).
2. 3 to 5 relevant technical tags (e.g. React, TypeScript, Performance, CSS, WebDev).

Return JSON only in this exact format:
{
  "category": "CategoryName",
  "tags": ["Tag1", "Tag2", "Tag3"]
}

Article snippet:
${content.slice(0, 5000)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json(parsed);
      }

      res.json({ category: "General", tags: ["Markdown", "Article"] });
    } catch (error: any) {
      console.error("AI Categorize error:", error);
      res.status(500).json({ error: error?.message || "Failed to categorize article" });
    }
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
