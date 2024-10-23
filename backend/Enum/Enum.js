const ProductStatus = {
    ACTIVE: 'Active',
    OUT_OF_STOCK: 'Out of Stock',
    INACTIVE: 'Inactive'
};
const AllSize = {
    // General clothing sizes
    Clothing: {
        XS: 'XS',
        S: 'S',
        M: 'M',
        L: 'L',
        XL: 'XL',
        XXL: 'XXL',
        XXXL: 'XXXL',
    },

    // Shoe sizes (US, UK, and EU standards)
  
    Shoes: {
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
    },
 

    // Pants and Jeans sizes (Waist in inches)
    Pants: {
        Waist: ['28', '30', '32', '34', '36', '38', '40', '42'],
        Length: ['30', '32', '34', '36'],
    },

    // Dresses (Standard and Numeric sizes)
    Dresses: {
        Standard: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        Numeric: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18'],
    },

    // Accessories (Belts, Hats, etc.)
    Accessories: {
        Belts: ['S', 'M', 'L', 'XL'],
        Hats: ['S/M', 'M/L', 'L/XL'],
    },

    // Rings (US sizes)
    Rings: ['4', '5', '6', '7', '8', '9', '10', '11', '12'],

    // Gloves (Unisex sizes)
    Gloves: ['XS', 'S', 'M', 'L', 'XL'],

    // Bra sizes (Band and Cup sizes)
    Bras: {
        Band: ['30', '32', '34', '36', '38', '40', '42', '44'],
        Cup: ['A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G'],
    },

    // Kids' Clothing (By age group)
    KidsClothing: {
        Baby: ['0-3 months', '3-6 months', '6-9 months', '9-12 months'],
        Toddler: ['1T', '2T', '3T', '4T'],
        Kids: ['4-5 years', '6-7 years', '8-9 years', '10-12 years'],
    },
};




module.exports = {
    ProductStatus,AllSize
};