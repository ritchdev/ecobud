import express from "express"
import cors from 'cors'
import path from 'path'

// Import routes
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { testRouter } from './routes/testRoutes.js'
import { learningRouter } from "./routes/learningRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images) - Optional for now
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use('/api/test', testRouter)
app.use('/api/learning', learningRouter)

export { app }
