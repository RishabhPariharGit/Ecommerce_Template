// src/enums/AllSize.js

const AllSize = {
    Clothing: {
      Men: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
      Women: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      Kids: ['0-3M', '3-6M', '6-9M', '12M', '18M', '2T', '3T', '4T', '5T', '6T'],
    },
    Shoes: {
      Men: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      Women: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10'],
      Kids: ['0C', '1C', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', '11C', '12C', '13C'],
    },
    Pants: {
      Men: {
        Waist: ['28W', '30W', '32W', '34W', '36W', '38W', '40W'],
        Length: ['30L', '32L', '34L'], // Length options
      },
      Women: {
        Waist: ['24', '26', '28', '30', '32', '34'],
        Length: ['30', '32', '34'], // Length options
      },
      Kids: {
        Waist: ['20', '22', '24', '26'],
        Length: ['18', '20'], // Length options
      },
    },
    Dresses: {
      Women: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      Kids: ['2T', '3T', '4T', '5T', '6T'],
    },
    Rings: {
      Men: ['8', '9', '10', '11', '12'],
      Women: ['5', '6', '7', '8', '9'],
    },
    Gloves: {
      Men: ['S', 'M', 'L', 'XL'],
      Women: ['XS', 'S', 'M', 'L'],
      Kids: ['XS', 'S', 'M'],
    },
    Bras: {
      Women: ['30A', '32B', '34C', '36D', '38DD', '40E'],
    },
    Accessories: {
      Men: [],
      Women: [],
      Kids: [],
    },
  };
  
  export default AllSize;
  