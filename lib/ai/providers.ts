type CompletionOptions = {
  system: string;
  user: string;
};

export async function requestJsonCompletion({ system, user }: CompletionOptions) {
  const openAiKey = process.env.OPENAI_API_KEY;
  const deepSeekKey = process.env.DEEPSEEK_API_KEY;

  try {
    if (openAiKey) {
      return await requestOpenAiJson(openAiKey, system, user);
    }

    if (deepSeekKey) {
      return await requestDeepSeekJson(deepSeekKey, system, user);
    }
  } catch (error) {
    console.warn("AI provider unavailable, using local fallback.", error);
  }

  return null;
}

async function requestOpenAiJson(apiKey: string, system: string, user: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content || "{}");
}

async function requestDeepSeekJson(apiKey: string, system: string, user: string) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`DeepSeek request failed: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content || "{}");
}
