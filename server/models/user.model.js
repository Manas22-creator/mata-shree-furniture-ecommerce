const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [cartItemSchema],
}, {
    timestamps: true,
});

// This method will run before a document is saved
userSchema.pre('save', async function () {
    // Only hash password if it is new or modified
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model('User', userSchema);

module.exports = User;
