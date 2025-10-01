require("dotenv").config(); // Load environment variables FIRST!

const express = require("express");
const connectDB = require("./src/config/database.js");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TaskFlow API! ",
    endpoints: {
      health: "/health",
      projects: "/api/projects",
      tasks: "/api/tasks"
    }
  });
});

// Import routes (when you create them)
// const projectRoutes = require("./routes/projectRoutes");
// const taskRoutes = require("./routes/taskRoutes");

// Mount routes (uncomment when ready)
// app.use("/api/projects", projectRoutes);
// app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(" Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

// Connect to Database and Start Server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n Server running on port ${PORT}`);
    console.log(` http://localhost:${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || "development"}\n`);
  });
}).catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});