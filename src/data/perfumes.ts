export interface Perfume {
  id: number;
  brand: string;
  name: string;
  category: 'men' | 'women' | 'unisex';
  price: number;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  imageUrl: string;
}

export const perfumes: Perfume[] = [
  // MEN (20)
  {
    id: 1,
    brand: "Dior",
    name: "Sauvage",
    category: "men",
    price: 150,
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      middle: ["Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium"],
      base: ["Ambroxan", "Cedar", "Labdanum"]
    },
    description: "A radically fresh composition, dictated by a name that has the ring of a manifesto. Sauvage is raw and noble at once.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 2,
    brand: "Dior",
    name: "Homme Intense",
    category: "men",
    price: 165,
    notes: {
      top: ["Lavender", "Iris"],
      middle: ["Ambrette", "Pear"],
      base: ["Virginia Cedar", "Vetiver"]
    },
    description: "An elegant woody floral fragrance with an unprecedented iris signature.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
  },
  {
    id: 3,
    brand: "Chanel",
    name: "Bleu de Chanel EDT",
    category: "men",
    price: 155,
    notes: {
      top: ["Citrus", "Mint", "Pink Pepper"],
      middle: ["Grapefruit", "Dry Cedar Notes", "Labdanum"],
      base: ["Ginger", "Sandalwood", "Patchouli", "Vetiver", "Incense", "Cedar"]
    },
    description: "A woody aromatic fragrance for the man who defies convention, unexpectedly fresh and clean.",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop"
  },
  {
    id: 4,
    brand: "Chanel",
    name: "Bleu de Chanel EDP",
    category: "men",
    price: 175,
    notes: {
      top: ["Citrus", "Mint"],
      middle: ["Melon", "Jasmine", "Grapefruit"],
      base: ["Cedar", "Sandalwood", "Patchouli"]
    },
    description: "The deepest and most sensual interpretation of Bleu de Chanel with warm and voluptuous notes.",
    imageUrl: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop"
  },
  {
    id: 5,
    brand: "Chanel",
    name: "Allure Homme Sport",
    category: "men",
    price: 140,
    notes: {
      top: ["Orange", "Aldehydes"],
      middle: ["Neroli", "Cedar"],
      base: ["White Musk", "Amber", "Tonka Bean"]
    },
    description: "A fresh and sensual composition that combines energy and elegance.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 6,
    brand: "Creed",
    name: "Aventus",
    category: "men",
    price: 445,
    notes: {
      top: ["Pineapple", "Bergamot", "Black Currant", "Apple"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oak Moss", "Ambergris", "Vanille"]
    },
    description: "A sophisticated blend celebrating strength, vision and success with fresh fruity top notes.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 7,
    brand: "Creed",
    name: "Green Irish Tweed",
    category: "men",
    price: 420,
    notes: {
      top: ["Lemon Verbena", "Peppermint"],
      middle: ["French Verbena", "Iris", "Violet Leaves"],
      base: ["Sandalwood", "Ambergris"]
    },
    description: "A timeless masculine fragrance evoking the rolling green hills of the Irish countryside.",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop"
  },
  {
    id: 8,
    brand: "Giorgio Armani",
    name: "Acqua di Giò Profumo",
    category: "men",
    price: 135,
    notes: {
      top: ["Bergamot", "Aquatic Notes"],
      middle: ["Geranium", "Sage", "Rosemary"],
      base: ["Patchouli", "Amber", "Incense"]
    },
    description: "A new wave of freshness with intensity, capturing the essence of the Mediterranean.",
    imageUrl: "https://images.unsplash.com/photo-1600612253971-422b1a45d4fe?w=500&h=600&fit=crop"
  },
  {
    id: 9,
    brand: "Jean Paul Gaultier",
    name: "Le Male",
    category: "men",
    price: 95,
    notes: {
      top: ["Mint", "Lavender", "Bergamot", "Cardamom"],
      middle: ["Orange Blossom", "Cumin", "Cinnamon"],
      base: ["Tonka Bean", "Sandalwood", "Cedar", "Amber", "Vanilla"]
    },
    description: "A strong and authentic eau de toilette that transforms men with sensuality.",
    imageUrl: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=500&h=600&fit=crop"
  },
  {
    id: 10,
    brand: "Jean Paul Gaultier",
    name: "Ultra Male",
    category: "men",
    price: 110,
    notes: {
      top: ["Pear", "Bergamot", "Mint", "Lemon"],
      middle: ["Lavender", "Cinnamon", "Sage"],
      base: ["Vanilla", "Amber", "Cedar", "Black Vanilla"]
    },
    description: "An intense and addictive reinterpretation of the legendary Le Male.",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&h=600&fit=crop"
  },
  {
    id: 11,
    brand: "Yves Saint Laurent",
    name: "Y EDP",
    category: "men",
    price: 130,
    notes: {
      top: ["Apple", "Ginger", "Bergamot"],
      middle: ["Sage", "Juniper Berries", "Geranium"],
      base: ["Amberwood", "Tonka Bean", "Cedar", "Vetiver", "Olibanum"]
    },
    description: "An intense and contrasted woody aromatic fragrance, powerful and refined.",
    imageUrl: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=500&h=600&fit=crop"
  },
  {
    id: 12,
    brand: "Yves Saint Laurent",
    name: "La Nuit de L'Homme",
    category: "men",
    price: 125,
    notes: {
      top: ["Cardamom", "Bergamot"],
      middle: ["Lavender", "Cedar", "Coumarin"],
      base: ["Vetiver", "Caraway"]
    },
    description: "A mysterious and sophisticated scent for the modern seducer.",
    imageUrl: "https://images.unsplash.com/photo-1676476042833-cf5a0f5e82b5?w=500&h=600&fit=crop"
  },
  {
    id: 13,
    brand: "Tom Ford",
    name: "Oud Wood",
    category: "men",
    price: 280,
    notes: {
      top: ["Rosewood", "Cardamom", "Chinese Pepper"],
      middle: ["Oud Wood", "Sandalwood", "Vetiver"],
      base: ["Tonka Bean", "Amber"]
    },
    description: "A rare and exotic blend of oud wood, rosewood and cardamom.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 14,
    brand: "Tom Ford",
    name: "Noir Extreme",
    category: "men",
    price: 185,
    notes: {
      top: ["Mandarin Orange", "Neroli", "Saffron", "Cardamom"],
      middle: ["Rose", "Jasmine", "Orange Blossom", "Musk"],
      base: ["Amber", "Sandalwood", "Vanilla", "Woody Notes"]
    },
    description: "An ambery oriental woody fragrance that is both velvety and sensual.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=600&fit=crop"
  },
  {
    id: 15,
    brand: "Paco Rabanne",
    name: "1 Million",
    category: "men",
    price: 98,
    notes: {
      top: ["Grapefruit", "Mint", "Blood Mandarin"],
      middle: ["Rose", "Cinnamon", "Spicy Notes"],
      base: ["Leather", "Wood", "Amber", "White Musk"]
    },
    description: "A luxurious spicy and leathery fragrance for the man who wants it all.",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop"
  },
  {
    id: 16,
    brand: "Paco Rabanne",
    name: "Invictus",
    category: "men",
    price: 95,
    notes: {
      top: ["Grapefruit", "Marine Notes", "Mandarin Orange"],
      middle: ["Bay Leaf", "Jasmine"],
      base: ["Ambergris", "Guaiac Wood", "Patchouli", "Oak Moss"]
    },
    description: "A fresh and powerful aquatic woody fragrance for the modern champion.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 17,
    brand: "Versace",
    name: "Eros",
    category: "men",
    price: 105,
    notes: {
      top: ["Mint", "Green Apple", "Lemon"],
      middle: ["Tonka Bean", "Ambroxan", "Geranium"],
      base: ["Vanilla", "Vetiver", "Oak Moss", "Cedar", "Atlas Cedar"]
    },
    description: "A luminous and powerful fragrance inspired by Greek mythology.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 18,
    brand: "Versace",
    name: "Dylan Blue",
    category: "men",
    price: 100,
    notes: {
      top: ["Calabrian Bergamot", "Grapefruit", "Fig Leaf", "Aquatic Notes"],
      middle: ["Violet Leaf", "Papyrus", "Patchouli", "Black Pepper", "Ambroxan"],
      base: ["Musk", "Tonka Bean", "Saffron", "Incense"]
    },
    description: "A Mediterranean-inspired fragrance with a distinctly modern edge.",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop"
  },
  {
    id: 19,
    brand: "Givenchy",
    name: "Gentleman Reserve Privée",
    category: "men",
    price: 135,
    notes: {
      top: ["Pear", "Pink Pepper"],
      middle: ["Iris Absolute", "Orange Blossom"],
      base: ["Bourbon Vanilla", "Cocoa", "Benzoin"]
    },
    description: "A refined blend of iris and vanilla for the modern gentleman.",
    imageUrl: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop"
  },
  {
    id: 20,
    brand: "Prada",
    name: "Luna Rossa Carbon",
    category: "men",
    price: 120,
    notes: {
      top: ["Bergamot", "Pepper"],
      middle: ["Lavender"],
      base: ["Metallic Notes", "Patchouli", "Ambroxan"]
    },
    description: "A fresh and modern fougère reinvented with a magnetic mineral accord.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
  },

  // WOMEN (20)
  {
    id: 21,
    brand: "Chanel",
    name: "Coco Mademoiselle",
    category: "women",
    price: 165,
    notes: {
      top: ["Orange", "Bergamot", "Grapefruit"],
      middle: ["Rose", "Jasmine", "Litchi"],
      base: ["Patchouli", "Vetiver", "Vanilla", "White Musk"]
    },
    description: "An irresistible fresh oriental fragrance, a whiff of provocative essence.",
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&h=600&fit=crop"
  },
  {
    id: 22,
    brand: "Chanel",
    name: "N°5",
    category: "women",
    price: 175,
    notes: {
      top: ["Aldehydes", "Neroli", "Ylang-Ylang", "Bergamot", "Lemon"],
      middle: ["Jasmine", "Rose", "Lily-of-the-Valley", "Iris"],
      base: ["Sandalwood", "Vetiver", "Vanilla", "Amber", "Musk", "Cedar"]
    },
    description: "The timeless legend, an abstract bouquet of aldehydic florals.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 23,
    brand: "Dior",
    name: "J'adore",
    category: "women",
    price: 155,
    notes: {
      top: ["Pear", "Melon", "Magnolia", "Peach", "Bergamot", "Mandarin Orange"],
      middle: ["Jasmine", "Lily-of-the-Valley", "Tuberose", "Rose", "Plum", "Violet", "Orchid", "Freesia"],
      base: ["Blackberry", "Musk", "Cedar", "Vanilla"]
    },
    description: "A vibrant floral bouquet that embodies absolute femininity.",
    imageUrl: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=500&h=600&fit=crop"
  },
  {
    id: 24,
    brand: "Dior",
    name: "Miss Dior",
    category: "women",
    price: 145,
    notes: {
      top: ["Blood Orange", "Mandarin Orange"],
      middle: ["Rose", "Peony"],
      base: ["Musk", "Rosewood"]
    },
    description: "A fresh and romantic eau de parfum, an ode to love and optimism.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
  },
  {
    id: 25,
    brand: "Yves Saint Laurent",
    name: "Black Opium",
    category: "women",
    price: 145,
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"]
    },
    description: "A highly addictive feminine fragrance with the signature coffee note.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 26,
    brand: "Lancôme",
    name: "La Vie Est Belle",
    category: "women",
    price: 135,
    notes: {
      top: ["Black Currant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"]
    },
    description: "A declaration of happiness and freedom, life is beautiful.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 27,
    brand: "Mugler",
    name: "Alien",
    category: "women",
    price: 130,
    notes: {
      top: ["Jasmine Sambac"],
      middle: ["Cashmeran"],
      base: ["White Amber"]
    },
    description: "A radiant talisman of solar jasmine and otherworldly amber.",
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&h=600&fit=crop"
  },
  {
    id: 28,
    brand: "Mugler",
    name: "Angel",
    category: "women",
    price: 125,
    notes: {
      top: ["Bergamot", "Coconut", "Pineapple", "Cassia"],
      middle: ["Honey", "Apricot", "Blackberry", "Plum", "Jasmine", "Orchid", "Rose", "Lily-of-the-Valley"],
      base: ["Chocolate", "Caramel", "Vanilla", "Tonka Bean", "Sandalwood", "Musk", "Patchouli", "Cedar"]
    },
    description: "A revolutionary gourmand composition that changed perfumery forever.",
    imageUrl: "https://images.unsplash.com/photo-1600612253971-422b1a45d4fe?w=500&h=600&fit=crop"
  },
  {
    id: 29,
    brand: "Valentino",
    name: "Donna Born In Roma",
    category: "women",
    price: 135,
    notes: {
      top: ["Bergamot", "Pink Pepper", "Green Mandarin"],
      middle: ["Jasmine Grandiflorum", "Musk"],
      base: ["Bourbon Vanilla", "Woody Notes"]
    },
    description: "A couture fragrance celebrating Roman elegance and modern femininity.",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&h=600&fit=crop"
  },
  {
    id: 30,
    brand: "Givenchy",
    name: "L'Interdit",
    category: "women",
    price: 140,
    notes: {
      top: ["Pear", "Bergamot"],
      middle: ["Orange Blossom", "Jasmine", "Tuberose"],
      base: ["Patchouli", "Vetiver", "Ambroxan"]
    },
    description: "A thrilling white floral bouquet celebrating the spirit of transgression.",
    imageUrl: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=500&h=600&fit=crop"
  },
  {
    id: 31,
    brand: "Gucci",
    name: "Bloom",
    category: "women",
    price: 130,
    notes: {
      top: ["Rangoon Creeper"],
      middle: ["Jasmine", "Tuberose"],
      base: ["Sandalwood", "Orris"]
    },
    description: "A rich white floral capturing the spirit of thriving in a garden.",
    imageUrl: "https://images.unsplash.com/photo-1676476042833-cf5a0f5e82b5?w=500&h=600&fit=crop"
  },
  {
    id: 32,
    brand: "Marc Jacobs",
    name: "Daisy",
    category: "women",
    price: 95,
    notes: {
      top: ["Strawberry", "Violet Leaves", "Blood Grapefruit"],
      middle: ["Gardenia", "Violet Petals", "Jasmine"],
      base: ["Musk", "Vanilla", "White Woods"]
    },
    description: "A sparkling floral bouquet that embodies fresh femininity.",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop"
  },
  {
    id: 33,
    brand: "Giorgio Armani",
    name: "Sì",
    category: "women",
    price: 140,
    notes: {
      top: ["Black Currant", "Mandarin Orange"],
      middle: ["May Rose", "Freesia"],
      base: ["Vanilla", "Patchouli", "Ambroxan", "Woody Notes"]
    },
    description: "A modern chypre imbued with grace and independent femininity.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=600&fit=crop"
  },
  {
    id: 34,
    brand: "Carolina Herrera",
    name: "Good Girl",
    category: "women",
    price: 125,
    notes: {
      top: ["Almond", "Coffee", "Bergamot", "Lemon"],
      middle: ["Tuberose", "Orange Blossom", "Jasmine Sambac", "Rose"],
      base: ["Cocoa", "Tonka Bean", "Sandalwood", "Cinnamon", "Cashmere Wood", "Cedar", "Praline", "Vanilla"]
    },
    description: "A daring duality of luminous tuberose and mysterious tonka.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 35,
    brand: "Tom Ford",
    name: "Lost Cherry",
    category: "women",
    price: 350,
    notes: {
      top: ["Black Cherry", "Cherry Liqueur"],
      middle: ["Bitter Almond", "Turkish Rose", "Jasmine Sambac"],
      base: ["Peru Balsam", "Roasted Tonka", "Sandalwood", "Vetiver", "Cedar"]
    },
    description: "A provocative temptation of seductive black cherry and exotic spices.",
    imageUrl: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=500&h=600&fit=crop"
  },
  {
    id: 36,
    brand: "Maison Francis Kurkdjian",
    name: "Baccarat Rouge 540",
    category: "women",
    price: 385,
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedar"]
    },
    description: "A luminous amber woody sensation like a series of crystal vibrations.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 37,
    brand: "Burberry",
    name: "Her",
    category: "women",
    price: 115,
    notes: {
      top: ["Dark Berries", "Blackberry", "Raspberry", "Black Currant", "Lemon", "Strawberry", "Mandarin Orange"],
      middle: ["Jasmine", "Violet"],
      base: ["Musk", "Amber", "Oakmoss", "Woody Notes", "Dry Cocoa"]
    },
    description: "A fruity and musky scent celebrating the energy of London.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 38,
    brand: "Dolce & Gabbana",
    name: "Light Blue",
    category: "women",
    price: 95,
    notes: {
      top: ["Sicilian Lemon", "Apple", "Bluebell"],
      middle: ["Jasmine", "Bamboo", "White Rose"],
      base: ["Cedar", "Amber", "Musk"]
    },
    description: "The essence of a sensual Mediterranean summer in Sicily.",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop"
  },
  {
    id: 39,
    brand: "Viktor & Rolf",
    name: "Flowerbomb",
    category: "women",
    price: 180,
    notes: {
      top: ["Bergamot", "Tea"],
      middle: ["Jasmine", "Orange Blossom", "Rose", "Freesia", "Orchid"],
      base: ["Patchouli", "Musk"]
    },
    description: "A floral explosion that transforms the negative into a positive.",
    imageUrl: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop"
  },
  {
    id: 40,
    brand: "Narciso Rodriguez",
    name: "For Her",
    category: "women",
    price: 125,
    notes: {
      top: ["Rose", "Peach", "Osmanthus"],
      middle: ["Musk", "Amber"],
      base: ["Vetiver", "Sandalwood", "Patchouli"]
    },
    description: "A seductive heart of musk, elevated by floral and woody notes.",
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&h=600&fit=crop"
  },

  // UNISEX (20)
  {
    id: 41,
    brand: "Creed",
    name: "Silver Mountain Water",
    category: "unisex",
    price: 395,
    notes: {
      top: ["Bergamot", "Mandarin Orange", "Neroli", "Green Tea"],
      middle: ["Green Tea", "Galbanum"],
      base: ["Musk", "Sandalwood", "Petit Grain"]
    },
    description: "A cool and crisp scent evoking the rush of alpine spring water.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 42,
    brand: "Maison Francis Kurkdjian",
    name: "Gentle Fluidity Gold",
    category: "unisex",
    price: 295,
    notes: {
      top: ["Coriander", "Juniper Berries", "Nutmeg"],
      middle: ["Rum Absolute", "Musk"],
      base: ["Vanilla", "Sandalwood", "Amber"]
    },
    description: "An oriental vanilla, warm and luminous, exploring the fluidity of gender.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
  },
  {
    id: 43,
    brand: "Maison Francis Kurkdjian",
    name: "Gentle Fluidity Silver",
    category: "unisex",
    price: 295,
    notes: {
      top: ["Juniper Berries", "Coriander", "Nutmeg"],
      middle: ["Musks"],
      base: ["Amber", "Woods"]
    },
    description: "A juniper musky composition, cool and intoxicating.",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop"
  },
  {
    id: 44,
    brand: "Le Labo",
    name: "Santal 33",
    category: "unisex",
    price: 310,
    notes: {
      top: ["Cardamom", "Iris", "Violet"],
      middle: ["Ambrox", "Australian Sandalwood", "Papyrus"],
      base: ["Cedarwood", "Leather", "Musk"]
    },
    description: "A legendary sandalwood scent that became a cult icon.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 45,
    brand: "Le Labo",
    name: "Another 13",
    category: "unisex",
    price: 320,
    notes: {
      top: ["Moss Accord"],
      middle: ["Ambroxan", "Jasmine Petals"],
      base: ["Musk", "Moss"]
    },
    description: "A magnetic musky abstraction, a collaboration with AnOther Magazine.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 46,
    brand: "Byredo",
    name: "Gypsy Water",
    category: "unisex",
    price: 275,
    notes: {
      top: ["Bergamot", "Lemon", "Pepper"],
      middle: ["Incense", "Pine Needles", "Orris"],
      base: ["Sandalwood", "Vanilla", "Amber"]
    },
    description: "A romanticized vision of the Roma people and their free spirit.",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&h=600&fit=crop"
  },
  {
    id: 47,
    brand: "Byredo",
    name: "Bal d'Afrique",
    category: "unisex",
    price: 275,
    notes: {
      top: ["Bergamot", "Lemon", "Neroli", "African Marigold"],
      middle: ["Violet", "Jasmine Petals", "Cyclamen", "Buchu"],
      base: ["Black Amber", "Musk", "Vetiver", "Moroccan Cedarwood"]
    },
    description: "A celebration of Africa through the prism of 1920s Paris.",
    imageUrl: "https://images.unsplash.com/photo-1600612253971-422b1a45d4fe?w=500&h=600&fit=crop"
  },
  {
    id: 48,
    brand: "Tom Ford",
    name: "Neroli Portofino",
    category: "unisex",
    price: 295,
    notes: {
      top: ["Bergamot", "Mandarin Orange", "Lemon", "Lavender", "Myrtle", "Orange Blossom"],
      middle: ["African Orange Flower", "Neroli", "Jasmine"],
      base: ["Amber", "Angelica", "Ambrette"]
    },
    description: "Capturing the essence of the Italian Riviera in a bottle.",
    imageUrl: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=500&h=600&fit=crop"
  },
  {
    id: 49,
    brand: "Tom Ford",
    name: "Tobacco Vanille",
    category: "unisex",
    price: 285,
    notes: {
      top: ["Tobacco Leaf", "Spicy Notes"],
      middle: ["Vanilla", "Tonka Bean", "Tobacco Blossom", "Cocoa"],
      base: ["Dried Fruits", "Woody Notes"]
    },
    description: "An opulent and heady interpretation of tobacco with vanilla and spices.",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop"
  },
  {
    id: 50,
    brand: "Jo Malone",
    name: "Wood Sage & Sea Salt",
    category: "unisex",
    price: 145,
    notes: {
      top: ["Ambrette Seeds"],
      middle: ["Sea Salt"],
      base: ["Sage"]
    },
    description: "Escape the everyday along the windswept shore.",
    imageUrl: "https://images.unsplash.com/photo-1676476042833-cf5a0f5e82b5?w=500&h=600&fit=crop"
  },
  {
    id: 51,
    brand: "Jo Malone",
    name: "English Pear & Freesia",
    category: "unisex",
    price: 145,
    notes: {
      top: ["King William Pear", "Melon"],
      middle: ["Freesia"],
      base: ["Musk", "Patchouli", "Rhubarb", "Rose", "Amber"]
    },
    description: "The essence of autumn, luscious and golden.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=600&fit=crop"
  },
  {
    id: 52,
    brand: "Kilian",
    name: "Angels' Share",
    category: "unisex",
    price: 295,
    notes: {
      top: ["Cognac"],
      middle: ["Oak", "Cinnamon", "Tonka Bean"],
      base: ["Sandalwood", "Praline", "Vanilla"]
    },
    description: "A heavenly gourmand, the spirit that angels take during cognac aging.",
    imageUrl: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=500&h=600&fit=crop"
  },
  {
    id: 53,
    brand: "Diptyque",
    name: "Philosykos",
    category: "unisex",
    price: 165,
    notes: {
      top: ["Fig Leaf"],
      middle: ["Fig Tree Bark"],
      base: ["White Cedar"]
    },
    description: "A green, woody fig scent evoking Mediterranean groves.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop"
  },
  {
    id: 54,
    brand: "Diptyque",
    name: "Tam Dao",
    category: "unisex",
    price: 165,
    notes: {
      top: ["Rose Wood", "Myrtle"],
      middle: ["Cypress", "Amyris"],
      base: ["Sandalwood", "Cedar", "Spicy Notes"]
    },
    description: "A creamy sandalwood that evokes sacred Buddhist temples.",
    imageUrl: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop"
  },
  {
    id: 55,
    brand: "Montale",
    name: "Intense Café",
    category: "unisex",
    price: 155,
    notes: {
      top: ["Saffron", "Coffee"],
      middle: ["Floral Notes", "Rose", "Amber"],
      base: ["Vanilla", "White Musk", "Sandalwood"]
    },
    description: "An intoxicating fusion of coffee and rose, unexpected yet addictive.",
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&h=600&fit=crop"
  },
  {
    id: 56,
    brand: "Mancera",
    name: "Cedrat Boise",
    category: "unisex",
    price: 135,
    notes: {
      top: ["Citron", "Black Currant", "Sicilian Lemon", "Bergamot"],
      middle: ["Spicy Notes", "Woody Notes"],
      base: ["White Musk", "Leather", "Vanilla", "Patchouli", "Sandalwood", "Moss"]
    },
    description: "A vibrant citrus-woody masterpiece with remarkable longevity.",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop"
  },
  {
    id: 57,
    brand: "Amouage",
    name: "Interlude",
    category: "unisex",
    price: 350,
    notes: {
      top: ["Oregano", "Pimento", "Bergamot"],
      middle: ["Frankincense", "Opoponax", "Labdanum", "Cistus", "Amber"],
      base: ["Sandalwood", "Oud", "Leather", "Musk"]
    },
    description: "A story of harmony through chaos, opulent and smoky.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
  },
  {
    id: 58,
    brand: "Xerjoff",
    name: "Naxos",
    category: "unisex",
    price: 285,
    notes: {
      top: ["Lavender", "Bergamot", "Lemon"],
      middle: ["Cinnamon", "Honey", "Cashmeran", "Jasmine"],
      base: ["Tobacco", "Vanilla", "Tonka Bean"]
    },
    description: "A tribute to the sweet pleasures of Mediterranean life.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
  },
  {
    id: 59,
    brand: "Nishane",
    name: "Hacivat",
    category: "unisex",
    price: 195,
    notes: {
      top: ["Pineapple", "Bergamot", "Grapefruit"],
      middle: ["Jasmine", "Patchouli", "Rose"],
      base: ["Woody Notes", "Oakmoss", "Musk", "Amber"]
    },
    description: "A fresh woody composition inspired by the legendary shadow play character.",
    imageUrl: "https://images.unsplash.com/photo-1600612253971-422b1a45d4fe?w=500&h=600&fit=crop"
  },
  {
    id: 60,
    brand: "Initio",
    name: "Side Effect",
    category: "unisex",
    price: 295,
    notes: {
      top: ["Rum"],
      middle: ["Cinnamon", "Vanilla"],
      base: ["Tobacco", "Benzoin", "Hedione"]
    },
    description: "A powerful addictive blend, beware of its intoxicating side effects.",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&h=600&fit=crop"
  }
];

export const getCategories = () => ['all', 'men', 'women', 'unisex'] as const;

export const filterPerfumes = (category: string) => {
  if (category === 'all') return perfumes;
  return perfumes.filter(p => p.category === category);
};
