import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.send('OK WORKING');
});
const BASE_URL = "https://platform.higgsfield.ai";
const API_KEY = process.env.HIGGS_API_KEY;

// Generate request
app.post("/generate", async (req, res) => {
  try {
    const { prompt, model_id } = req.body;

    const response = await axios.post(
      `${BASE_URL}/${model_id}`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
});

// Check status
app.get("/status/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/requests/${req.params.id}/status`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MCP running on port ${PORT}`);
});

setInterval(() => { }, 1000);
