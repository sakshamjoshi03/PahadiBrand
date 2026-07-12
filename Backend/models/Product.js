const mongoose = require("mongoose");

// ======================
// Image Schema
// ======================
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ======================
// Specification Schema
// ======================
const specificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// ======================
// Sustainability Schema
// ======================
const sustainabilitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

// ======================
// Product Schema
// ======================
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    fullDescription: {
      type: String,
      default: "",
    },

    images: {
      type: [imageSchema],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    specifications: {
      type: [specificationSchema],
      default: [],
    },

    sustainability: {
      type: sustainabilitySchema,
      default: () => ({}),
    },

    tags: {
      type: [String],
      default: [],
    },

    aiContext: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);