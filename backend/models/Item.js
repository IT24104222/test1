const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true // Removes accidental whitespace
    },
    description: { 
        type: String 
    },
    category: { 
        type: String, 
        required: true,
        lowercase: true // Helps with the CSS color logic (e.g., "Food" becomes "food")
    },
    quantity: { 
        type: Number, 
        default: 1,
        min: 0 // Prevents negative inventory
    },
    isPacked: { 
        type: Boolean, 
        default: false // This powers your new checkbox!
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Item', ItemSchema);