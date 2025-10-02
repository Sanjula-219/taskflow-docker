const mongoose = require("mongoose");

// Define Schema 
const projectSchema = new mongoose.Schema(
  {
    // Field 1: Project Name
    name: {
      type: String,           // Data type
      required: [true, "Project name is required"],  // Validation
      trim: true,             // Remove extra spaces
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },

    // Field 2: Description
    description: {
      type: String,
      required: false,        // Optional field
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "No description provided"  // Default value
    },

    // Field 3: Status
    status: {
      type: String,
      enum: {                 // Only these values allowed
        values: ["active", "archived", "on-hold"],
        message: "{VALUE} is not a valid status"
      },
      default: "active"       // Default status
    },

    // Field 4: Created By (Optional - for later)
    createdBy: {
      type: String,
      default: "Anonymous"
    }
  },
  {
    // Automatic timestamps
    timestamps: true  // Adds createdAt and updatedAt automatically!
  }
);

// Create Model from Schema
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;