export type Item = {
    id: number;
    name: string;
    store: "7-Eleven" | "Lawson" | "FamilyMart" | "Ministop";
    category: string;
    priceYen?: number;
    isNew?: boolean;
  };
  
  export const ITEMS: Item[] = [
    { id: 1, name: "Matcha Latte", store: "7-Eleven", category: "Drinks", priceYen: 180, isNew: true },
    { id: 2, name: "Onigiri (Salmon)", store: "Lawson", category: "Food", priceYen: 170 },
    { id: 3, name: "Melon Pan", store: "FamilyMart", category: "Bakery", priceYen: 150 },
    { id: 4, name: "Karaage Cup", store: "Ministop", category: "Food", priceYen: 320, isNew: true },
  ];

  