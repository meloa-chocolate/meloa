export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  ingredients: string[];
  price: number;
  weight: string;
  image: string;
  imageAlt: string;
  badge?: string;
  available: boolean;
  foodInfo: {
    fullIngredients?: string;
    allergens?: string;
    storage?: string;
    bestBefore?: string;
    nutrition?: string;
    manufacturer?: string;
  };
};

export const products: Product[] = [
  {
    id: "raspberry-pistachio",
    name: "Raspberry Pistachio",
    subtitle: "Белый бельгийский шоколад · фисташка · малина · морская соль",
    description:
      "Сливочный белый шоколад, яркая кислинка малины, фисташка и лёгкий солёный акцент.",
    ingredients: [
      "Белый бельгийский шоколад",
      "Фисташки, очищенные и несолёные",
      "Сублимированная малина",
      "Крупная морская соль",
    ],
    price: 12,
    weight: "100 г",
    image: "/images/raspberry-pistachio.jpg",
    imageAlt: "Плитка белого шоколада с малиной и фисташкой ручной работы",
    badge: "Signature",
    available: true,
    foodInfo: {
      fullIngredients: "Белый бельгийский шоколад, фисташки (очищенные, несолёные), сублимированная малина, крупная морская соль.",
      allergens: "TODO: подтвердить перечень аллергенов и следов аллергенов.",
      storage: "TODO: добавить подтверждённые условия хранения.",
      bestBefore: "TODO: добавить срок годности / best before.",
      nutrition: "TODO: добавить пищевую ценность.",
      manufacturer: "TODO: добавить юридические данные производителя.",
    },
  },
  {
    id: "dark-orange",
    name: "Dark Orange",
    subtitle: "Тёмный шоколад · апельсин · миндаль",
    description: "Глубокий шоколадный вкус, цитрусовая свежесть и сухой миндальный хруст.",
    ingredients: ["Тёмный шоколад", "Апельсин", "Миндаль"],
    price: 11,
    weight: "100 г",
    image: "/images/dark-orange-new.svg",
    imageAlt: "Dark Orange — тёмный шоколад с апельсином и миндалём",
    available: false,
    foodInfo: { fullIngredients: "TODO", allergens: "TODO", storage: "TODO", bestBefore: "TODO", nutrition: "TODO", manufacturer: "TODO" },
  },
  {
    id: "hazelnut-crunch",
    name: "Hazelnut Crunch",
    subtitle: "Молочный шоколад · фундук · хрустящий элемент",
    description: "Мягкий молочный шоколад с жареным фундуком и выразительной хрустящей текстурой.",
    ingredients: ["Молочный шоколад", "Фундук", "Хрустящий элемент"],
    price: 11,
    weight: "100 г",
    image: "/images/hazelnut-crunch-new.svg",
    imageAlt: "Hazelnut Crunch — молочный шоколад с фундуком",
    available: false,
    foodInfo: { fullIngredients: "TODO", allergens: "TODO", storage: "TODO", bestBefore: "TODO", nutrition: "TODO", manufacturer: "TODO" },
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    subtitle: "Белый шоколад · клубника · матча",
    description: "Сливочная база, ягодная кислинка и тонкий травянистый профиль матча.",
    ingredients: ["Белый шоколад", "Клубника", "Матча"],
    price: 12,
    weight: "100 г",
    image: "/images/strawberry-matcha-new.svg",
    imageAlt: "Strawberry Matcha — белый шоколад с клубникой и матча",
    available: false,
    foodInfo: { fullIngredients: "TODO", allergens: "TODO", storage: "TODO", bestBefore: "TODO", nutrition: "TODO", manufacturer: "TODO" },
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel",
    subtitle: "Молочный шоколад · карамель · соль",
    description: "Сбалансированная карамельная сладость с чистым солёным финалом.",
    ingredients: ["Молочный шоколад", "Карамель", "Соль"],
    price: 11,
    weight: "100 г",
    image: "/images/salted-caramel-new.svg",
    imageAlt: "Salted Caramel — молочный шоколад с карамелью и морской солью",
    available: false,
    foodInfo: { fullIngredients: "TODO", allergens: "TODO", storage: "TODO", bestBefore: "TODO", nutrition: "TODO", manufacturer: "TODO" },
  },
];

export const availableProducts = products.filter((product) => product.available);
