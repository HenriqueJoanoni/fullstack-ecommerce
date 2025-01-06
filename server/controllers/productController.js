const Product = require('../models/Product');

const insertProducts = async () => {
    const productDocuments = [
        /* Guitars */
        {
            product_picture: ["https://example.com/assets/fender_strat.jpg"],
            product_sku: "SKU123456",
            product_name: "Fender Stratocaster",
            product_description: "A classic electric guitar with a comfortable contoured body and iconic tone.",
            product_price: 1500.00,
            is_available: true,
            product_deal: {
                is_deal: true,
                discount_price: 1400.00,
                deal_deadline: "2025-06-01"
            },
            product_category: "guitar",
            product_brand: "Fender"
        },
        {
            product_picture: ["https://example.com/assets/gibson_les_paul.jpg"],
            product_sku: "SKU789012",
            product_name: "Gibson Les Paul Standard '50s",
            product_description: "Known for its sustain and warm tones, this guitar is a rock legend.",
            product_price: 2500.00,
            is_available: true,
            product_deal: {
                is_deal: false,
                discount_price: 0,
                deal_deadline: "2025-06-01"
            },
            product_category: "guitar",
            product_brand: "Gibson"
        },
        {
            product_picture: ["https://example.com/assets/ibanez_rg.jpg"],
            product_sku: "SKU345678",
            product_name: "Ibanez RG Series",
            product_description: "A shredding machine with fast necks and powerful pickups, perfect for metal and rock.",
            product_price: 1000.00,
            is_available: true,
            product_deal: {
                is_deal: true,
                discount_price: 900.00,
                deal_deadline: "2025-05-01"
            },
            product_category: "guitar",
            product_brand: "Ibanez"
        },

        /* Strings */
        {
            product_picture: ["https://example.com/assets/ernie_ball_strings.jpg"],
            product_sku: "SKU567890",
            product_name: "Ernie Ball Regular Slinky Strings (10-46)",
            product_description: "Popular guitar strings with a balanced tone and smooth feel.",
            product_price: 6.99,
            is_available: true,
            product_deal: {
                is_deal: true,
                discount_price: 5.99,
                deal_deadline: "2025-03-01"
            },
            product_category: "strings",
            product_brand: "Ernie Ball"
        },
        {
            product_picture: ["https://example.com/assets/daddario_strings.jpg"],
            product_sku: "SKU123789",
            product_name: "D'Addario NYXL (10-46)",
            product_description: "Premium guitar strings with unmatched strength and tuning stability.",
            product_price: 12.99,
            is_available: true,
            product_deal: {
                is_deal: false,
                discount_price: 0,
                deal_deadline: "2025-06-01"
            },
            product_category: "strings",
            product_brand: "D'Addario"
        },

        /* Picks */
        {
            product_picture: ["https://example.com/assets/dunlop_tortex.jpg"],
            product_sku: "SKU098765",
            product_name: "Dunlop Tortex Picks (0.88mm)",
            product_description: "Durable and reliable picks for all playing styles.",
            product_price: 3.99,
            is_available: true,
            product_deal: {
                is_deal: false,
                discount_price: 0,
                deal_deadline: "2025-06-01"
            },
            product_category: "picks",
            product_brand: "Dunlop"
        },
        {
            product_picture: ["https://example.com/assets/fender_picks.jpg"],
            product_sku: "SKU234567",
            product_name: "Fender Medium Picks (Pack of 12)",
            product_description: "Classic celluloid picks for a warm tone and traditional feel.",
            product_price: 5.99,
            is_available: true,
            product_deal: {
                is_deal: true,
                discount_price: 4.99,
                deal_deadline: "2025-02-01"
            },
            product_category: "picks",
            product_brand: "Fender"
        },

        /* Amplifiers */
        {
            product_picture: ["https://example.com/assets/fender_amp.jpg"],
            product_sku: "SKU654321",
            product_name: "Fender Blues Junior IV",
            product_description: "A versatile tube amplifier with warm tones and classic reverb.",
            product_price: 600.00,
            is_available: true,
            product_deal: {
                is_deal: true,
                discount_price: 550.00,
                deal_deadline: "2025-04-01"
            },
            product_category: "amplifiers",
            product_brand: "Fender"
        },
        {
            product_picture: ["https://example.com/assets/marshall_amp.jpg"],
            product_sku: "SKU987654",
            product_name: "Marshall DSL40CR",
            product_description: "A powerful amp with iconic Marshall tone and multiple channels.",
            product_price: 800.00,
            is_available: true,
            product_deal: {
                is_deal: false,
                discount_price: 0,
                deal_deadline: "2025-06-01"
            },
            product_category: "amplifiers",
            product_brand: "Marshall"
        }
    ];

    try {
        const result = await Product.insertMany(productDocuments);
        console.log("Product inserted:", result);
    } catch (error) {
        console.error("Error inserting product:", error);
    }
};

module.exports = {insertProducts};
