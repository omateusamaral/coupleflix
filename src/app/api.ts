import axios from "axios";

export async function sendMessageToChatGPT(message: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente que recomenda filmes e séries, recomende até 20 séries ou filmes com base nesses gostos.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    return reply;
  } catch (error) {
    throw error;
  }
}
