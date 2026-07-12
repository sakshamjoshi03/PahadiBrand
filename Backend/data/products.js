const products = [
  {
    name: "Buransh Juice",
    slug: "buransh-juice",
    category: "Beverages",

    price: 249,
    stock: 20,

    rating: 4.8,
    reviewCount: 124,

    description:
      "Refreshing Himalayan Rhododendron (Buransh) juice made from handpicked flowers.",

    fullDescription:
      "Prepared using freshly harvested Buransh flowers from the Himalayan region of Uttarakhand, this traditional beverage is naturally rich in antioxidants and is known for its cooling properties. It offers a refreshing taste while supporting local mountain communities and sustainable harvesting practices.",

    images: [
      {
        url: "/product-images/buransh/main.png",
        alt: "Buransh Juice Bottle",
        isPrimary: true,
      },
      {
        url: "/product-images/buransh/1.png",
        alt: "Front View",
      },
      {
        url: "/product-images/buransh/2.png",
        alt: "Buransh Flower",
      },
      {
        url: "/product-images/buransh/3.png",
        alt: "Serving Suggestion",
      },
    ],

    features: [
      "100% Natural",
      "No Artificial Preservatives",
      "Rich in Antioxidants",
      "Made in Uttarakhand",
    ],

    specifications: [
      { key: "Quantity", value: "750 ml" },
      { key: "Shelf Life", value: "12 Months" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Storage", value: "Store in a cool place" },
    ],

    sustainability: {
      title: "Sustainability Commitment",
      description:
        "Harvested responsibly from Himalayan forests while supporting local women self-help groups.",
    },

    tags: [
      "juice",
      "organic",
      "healthy",
      "buransh",
      "drink",
    ],

    aiContext:
      "Recommended for people looking for refreshing natural beverages rich in antioxidants. Best served chilled.",

    isFeatured: true,
    isActive: true,
  },

  {
    name: "Wild Himalayan Honey",
    slug: "wild-himalayan-honey",
    category: "Organic",

    price: 599,
    stock: 15,

    rating: 4.9,
    reviewCount: 218,

    description:
      "Pure raw honey collected from untouched Himalayan forests.",

    fullDescription:
      "Collected by traditional Himalayan beekeepers using sustainable practices, this raw honey retains its natural enzymes, aroma, and nutritional value. Perfect for daily consumption and immunity support.",

    images: [
      {
        url: "/product-images/honey/main.png",
        alt: "Wild Himalayan Honey",
        isPrimary: true,
      },
      {
        url: "/product-images/honey/1.png",
        alt: "Honey Closeup",
      },
      {
        url: "/product-images/honey/2.png",
        alt: "Bee Collection",
      },
      {
        url: "/product-images/honey/3.png",
        alt: "Serving Honey",
      },
    ],

    features: [
      "Raw Honey",
      "No Added Sugar",
      "Forest Collected",
      "Unprocessed",
    ],

    specifications: [
      { key: "Weight", value: "500 g" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Shelf Life", value: "24 Months" },
      { key: "Storage", value: "Room Temperature" },
    ],

    sustainability: {
      title: "Eco Friendly Harvest",
      description:
        "Collected without disturbing natural bee habitats and supporting local beekeepers.",
    },

    tags: [
      "honey",
      "organic",
      "healthy",
      "forest",
    ],

    aiContext:
      "Excellent natural sweetener suitable for immunity, daily nutrition and healthy lifestyles.",

    isFeatured: true,
    isActive: true,
  },

  {
    name: "Mandua Flour",
    slug: "mandua-flour",
    category: "Grains",

    price: 180,
    stock: 30,

    rating: 4.7,
    reviewCount: 92,

    description:
      "Healthy finger millet flour rich in calcium and dietary fibre.",

    fullDescription:
      "Stone-ground Mandua flour sourced from Himalayan villages, known for its nutritional value and traditional farming methods.",

    images: [
      {
        url: "/product-images/mandua/main.png",
        alt: "Mandua Flour",
        isPrimary: true,
      },
      {
        url: "/product-images/mandua/1.png",
        alt: "Mandua Grain",
      },
      {
        url: "/product-images/mandua/2.png",
        alt: "Packaging",
      },
      {
        url: "/product-images/mandua/3.png",
        alt: "Serving Suggestion",
      },
    ],

    features: [
      "Stone Ground",
      "High Calcium",
      "Rich in Fibre",
      "Traditional Farming",
    ],

    specifications: [
      { key: "Weight", value: "1 kg" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Shelf Life", value: "6 Months" },
      { key: "Storage", value: "Cool & Dry Place" },
    ],

    sustainability: {
      title: "Supporting Farmers",
      description:
        "Purchased directly from Himalayan farmers using fair trade practices.",
    },

    tags: ["grain", "millet", "healthy"],

    aiContext:
      "Ideal for diabetic-friendly diets and traditional Himalayan recipes.",

    isFeatured: true,
    isActive: true,
  },

  {
    name: "Pahadi Rajma",
    slug: "pahadi-rajma",
    category: "Pulses",

    price: 320,
    stock: 25,

    rating: 4.8,
    reviewCount: 156,

    description:
      "Organic red kidney beans grown naturally in Uttarakhand.",

    fullDescription:
      "Known for its rich taste and creamy texture, Pahadi Rajma is cultivated at high altitudes without chemical fertilizers.",

    images: [
      {
        url: "/product-images/rajma/main.png",
        alt: "Pahadi Rajma",
        isPrimary: true,
      },
      { url: "/product-images/rajma/1.png", alt: "Rajma Closeup" },
      { url: "/product-images/rajma/2.png", alt: "Organic Farming" },
      { url: "/product-images/rajma/3.png", alt: "Cooked Rajma" },
    ],

    features: [
      "Organic",
      "Protein Rich",
      "High Altitude Grown",
      "Chemical Free",
    ],

    specifications: [
      { key: "Weight", value: "1 kg" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Shelf Life", value: "12 Months" },
      { key: "Storage", value: "Cool & Dry Place" },
    ],

    sustainability: {
      title: "Organic Farming",
      description:
        "Cultivated using environmentally responsible farming practices.",
    },

    tags: ["rajma", "protein", "organic"],

    aiContext:
      "Recommended for healthy protein-rich meals and traditional Indian cuisine.",

    isFeatured: true,
    isActive: true,
  },

  {
    name: "Apricot Oil",
    slug: "apricot-oil",
    category: "Wellness",

    price: 799,
    stock: 12,

    rating: 4.9,
    reviewCount: 78,

    description:
      "Cold-pressed Himalayan apricot kernel oil for skin and hair care.",

    fullDescription:
      "Extracted using traditional cold-press methods to preserve vitamins and nutrients. Suitable for skin nourishment and hair care.",

    images: [
      {
        url: "/product-images/apricot-oil/main.png",
        alt: "Apricot Oil",
        isPrimary: true,
      },
      { url: "/product-images/apricot-oil/1.png", alt: "Bottle View" },
      { url: "/product-images/apricot-oil/2.png", alt: "Apricot Seeds" },
      { url: "/product-images/apricot-oil/3.png", alt: "Usage" },
    ],

    features: [
      "Cold Pressed",
      "Chemical Free",
      "Rich in Vitamin E",
      "Premium Quality",
    ],

    specifications: [
      { key: "Quantity", value: "200 ml" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Shelf Life", value: "18 Months" },
    ],

    sustainability: {
      title: "Traditional Extraction",
      description:
        "Supporting local oil extraction units using eco-friendly methods.",
    },

    tags: ["oil", "wellness", "skin", "hair"],

    aiContext:
      "Suitable for skincare routines, massage therapy and hair nourishment.",

    isFeatured: false,
    isActive: true,
  },

  {
    name: "Jhangora",
    slug: "jhangora",
    category: "Grains",

    price: 220,
    stock: 18,

    rating: 4.6,
    reviewCount: 64,

    description:
      "Traditional barnyard millet harvested from Himalayan villages.",

    fullDescription:
      "A nutritious ancient grain cultivated in the Himalayan region using traditional farming practices.",

    images: [
      {
        url: "/product-images/jhangora/main.png",
        alt: "Jhangora",
        isPrimary: true,
      },
      { url: "/product-images/jhangora/1.png", alt: "Millet Grains" },
      { url: "/product-images/jhangora/2.png", alt: "Packaging" },
      { url: "/product-images/jhangora/3.png", alt: "Serving Bowl" },
    ],

    features: [
      "Gluten Free",
      "Traditional Grain",
      "High Fibre",
      "Naturally Grown",
    ],

    specifications: [
      { key: "Weight", value: "1 kg" },
      { key: "Origin", value: "Uttarakhand" },
      { key: "Shelf Life", value: "12 Months" },
    ],

    sustainability: {
      title: "Mountain Farming",
      description:
        "Directly sourced from Himalayan farming communities.",
    },

    tags: ["grain", "millet", "healthy"],

    aiContext:
      "Ideal for healthy diets and traditional Himalayan meals.",

    isFeatured: false,
    isActive: true,
  },
];

module.exports = products;