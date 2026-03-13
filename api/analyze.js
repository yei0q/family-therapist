module.exports = async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    const text = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
