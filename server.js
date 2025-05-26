const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const groundRoutes = require('./routes/groundRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api', groundRoutes);
app.use('/api', bookingRoutes);

app.use(errorHandler);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-booking';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
