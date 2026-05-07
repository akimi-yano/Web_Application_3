import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const app = express();

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// Supabase クライアント初期化
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// テスト用に書いたんですが、またテストしたい時のために残しておきます。
// console.log("URL:", process.env.SUPABASE_URL);
// console.log("KEY:", process.env.SUPABASE_KEY ? "Loaded" : "Not Loaded");

app.get('/api/emotions', async (req, res) => {
  const { data, error } = await supabase
    .from('emotions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/api/emotions', async (req, res) => {
  const { emotion, intensity, trigger, memo } = req.body;
  const { data, error } = await supabase
    .from('emotions')
    .insert([{ emotion, intensity, trigger, memo }])
    .select()
    .single();
    
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.delete('/api/emotions/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('emotions').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "削除に成功しました" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});