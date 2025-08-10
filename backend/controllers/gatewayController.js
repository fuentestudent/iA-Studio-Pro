const callLLM = async (llmName, prompt) => {
  // This is a placeholder for actual LLM API calls.
  // In a real application, you would integrate with the specific SDKs or APIs
  // for ChatGPT, Claude, Gemini, etc.
  console.log(`Simulating call to ${llmName} with prompt: "${prompt}"`);
  return {
    status: 'success',
    model: llmName,
    response: `This is a simulated response from ${llmName} for prompt: "${prompt}".`,
    timestamp: new Date().toISOString()
  };
};

exports.chatgpt = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const result = await callLLM('ChatGPT', prompt);
    res.json(result);
  } catch (error) {
    console.error(`Error calling ChatGPT: ${error.message}`);
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
};

exports.claude = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const result = await callLLM('Claude', prompt);
    res.json(result);
  } catch (error) {
    console.error(`Error calling Claude: ${error.message}`);
    res.status(500).json({ error: 'Failed to get response from Claude' });
  }
};

exports.gemini = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  try {
    // Sanitizar el prompt para prevenir errores de web_fetch
    const sanitizedPrompt = prompt.replace(/https?:\/\/[^\s]+/g, '[URL_REMOVED]');
    const result = await callLLM('Gemini', sanitizedPrompt);
    res.json(result);
  } catch (error) {
    console.error(`Error calling Gemini: ${error.message}`);
    res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
};