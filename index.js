const express = require('express');
const createClient = require('@supabase/supabase-js').createClient;

const supabase = createClient('https://umhwdqxslsscxlxsvvsf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaHdkcXhzbHNzY3hseHN2dnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjgyMTgsImV4cCI6MjA3MDM0NDIxOH0.T5o0gUJDwidKfTWNo46CrRxWCh5d_1ZZyTreej8O_98')
const app = express()
const port = 3000

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


app.listen(port, () => {
  console.log(`%c[UP] https://localhost:${port}`, 'color: green; font-weight: bold;')
})
