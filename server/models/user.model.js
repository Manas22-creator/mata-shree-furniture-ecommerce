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
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        // --- THIS IS THE FIX ---
        // We simply return to stop execution. Do not call next().
        return; 
    }

    // If the password IS modified, hash it before saving
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Call next() here to proceed with the save operation
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;