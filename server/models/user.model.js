const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    hashedPassword: {
      type: String,
      required: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },// Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    avatar: {
      type: String,
    },
    passedExams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
      }
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
      }
    ],
    topicsFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
      }
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      }
    ],
    roles: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('User', UserSchema);
