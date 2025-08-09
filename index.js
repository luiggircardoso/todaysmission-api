const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app = express();
const port = 3000;

app.get('/daily', async (req, res) => {
    const { data, error } = await supabase
        .from('challenges')
        .select('*')
    
    if (error) {
        return res.status(500).json({ error: error.message })
    }
    
    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No challenges found' })
    }
    
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomChallenge = data[randomIndex]
    
    res.json(randomChallenge)
})

// For local development
if (require.main === module) {
    app.listen(port, () => {
        console.log(`%c[UP] https://localhost:${port}`, 'color: green; font-weight: bold;');
    });
}

module.exports = app;
