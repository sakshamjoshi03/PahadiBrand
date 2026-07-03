require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [
  {
    name: "Buransh Juice",
    category: "Beverages",
    price: 249,
    rating: 4.8,
    stock: 20,
    image: "buransh.jpg",
    description: "Refreshing Himalayan Rhododendron (Buransh) juice."
  },
  {
    name: "Wild Himalayan Honey",
    category: "Organic",
    price: 599,
    rating: 4.9,
    stock: 15,
    image: "honey.jpg",
    description: "Pure natural honey collected from Himalayan forests."
  },
  {
    name: "Mandua Flour",
    category: "Grains",
    price: 180,
    rating: 4.7,
    stock: 30,
    image: "mandua.jpg",
    description: "Healthy finger millet flour rich in calcium and fiber."
  },
  {
    name: "Pahadi Rajma",
    category: "Pulses",
    price: 320,
    rating: 4.8,
    stock: 25,
    image: "rajma.jpg",
    description: "Organic red kidney beans grown in Uttarakhand."
  },
  {
    name: "Apricot Oil",
    category: "Wellness",
    price: 799,
    rating: 4.9,
    stock: 12,
    image: "apricot-oil.jpg",
    description: "Cold pressed Himalayan apricot kernel oil."
  },
  {
    name: "Jhangora",
    category: "Grains",
    price: 220,
    rating: 4.6,
    stock: 18,
    image: "jhangora.jpg",
    description: "Barnyard millet harvested from Himalayan villages."
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Database seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();