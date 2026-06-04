export const UNCATEGORIZED_CATEGORY = "未分類";

export const COURSE_CATEGORIES = [
  {
    id: "greetings",
    category: "問候",
    label: "問候",
    description: "建立最基本的打招呼、道謝、道歉和簡短回應。",
  },
  {
    id: "restaurant",
    category: "餐廳",
    label: "餐廳",
    description: "練習點餐、飲料、菜單和常見餐廳互動。",
  },
  {
    id: "transportation",
    category: "交通",
    label: "交通",
    description: "熟悉計程車、公車、車站、方向和移動相關表達。",
  },
  {
    id: "accommodation",
    category: "住宿",
    label: "住宿",
    description: "處理入住、退房、房間設備和旅館櫃台用語。",
  },
  {
    id: "directions",
    category: "方向位置",
    label: "方向位置",
    description: "練習問路、位置、遠近和空間方向。",
  },
  {
    id: "shopping",
    category: "購物",
    label: "購物",
    description: "練習價格、折扣、買賣和市場情境。",
  },
  {
    id: "travel",
    category: "旅遊",
    label: "旅遊",
    description: "整理旅途中常用地點、景點和文件用語。",
  },
  {
    id: "emergency",
    category: "緊急狀況",
    label: "緊急狀況",
    description: "準備迷路、生病、求助和重要場所的句子。",
  },
  {
    id: "numbers",
    category: "數字",
    label: "數字",
    description: "建立數字、金額、數量和基本計算的基礎。",
  },
  {
    id: "daily-life",
    category: "日常生活",
    label: "日常生活",
    description: "補齊學校、朋友、今天和生活常用表達。",
  },
];

export function countItemsByCategory(items = []) {
  return items.reduce((counts, item) => {
    const category = item.category || UNCATEGORIZED_CATEGORY;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
}

export function getCourseMeta(category) {
  return (
    COURSE_CATEGORIES.find((course) => course.category === category) || {
      id: category,
      category,
      label: category,
      description: "自訂主題，可從老師後台繼續擴充教材。",
    }
  );
}

export function collectCourseCategories(...categoryCountMaps) {
  const allCategories = new Set(
    categoryCountMaps.flatMap((categoryCounts) => Object.keys(categoryCounts))
  );

  return [
    ...COURSE_CATEGORIES.map((course) => course.category).filter((category) =>
      allCategories.has(category)
    ),
    ...Array.from(allCategories).filter(
      (category) =>
        !COURSE_CATEGORIES.some((course) => course.category === category)
    ),
  ];
}
