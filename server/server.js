import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import buildsRouter from './routes/buildsRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/builds', buildsRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PC Builder API is running' })
})

app.listen(PORT, () => {
  console.log(`🖥️  PC Builder server running on http://localhost:${PORT}`)
})
