const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Field 1: Task Title
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"]
    },

    // Field 2: Description
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description too long"],
      default: ""
    },

    // Field 3: Status
    status: {
      type: String,
      enum: {
        values: ["todo", "in-progress", "done"],
        message: "{VALUE} is not a valid status"
      },
      default: "todo"
    },

    // Field 4: Priority
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    // Field 5: Due Date (Optional)
    dueDate: {
      type: Date,
      required: false,
      validate: {
        validator: function(value) {
          // Due date should be in the future
          return !value || value >= new Date();
        },
        message: "Due date must be in the future"
      }
    },

    // Field 6: Reference to Project (IMPORTANT!)
    projectId: {
      type: mongoose.Schema.Types.ObjectId,  // MongoDB ID type
      ref: "Project",                         // References Project model
      required: [true, "Task must belong to a project"]
    },

    // Field 7: Tags (Array)
    tags: {
      type: [String],  // Array of strings
      default: []
    },

    // Field 8: Is Completed
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Middleware - Auto-update isCompleted based on status
taskSchema.pre("save", function(next) {
  if (this.status === "done") {
    this.isCompleted = true;
  } else {
    this.isCompleted = false;
  }
  next();
});

// Virtual field - doesn't store in DB
taskSchema.virtual("isOverdue").get(function() {
  if (!this.dueDate) return false;
  return this.dueDate < new Date() && this.status !== "done";
});

// Instance method
taskSchema.methods.markAsDone = function() {
  this.status = "done";
  this.isCompleted = true;
  return this.save();
};

// Static method
taskSchema.statics.findByPriority = function(priority) {
  return this.find({ priority: priority });
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;