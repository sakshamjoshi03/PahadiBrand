
class Product {

    constructor(
        id,
        name,
        category,
        price,
        rating = 0,
        stock = 0,
        image = "",
        description = ""
    ) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.stock = stock;
        this.image = image;
        this.description = description;

    }

}

module.exports = Product;

