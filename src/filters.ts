import { Filter } from "./types";

export const filters: Filter[] = [
  {
    name: "Notebook ASUS",
    required: ["notebook"],
    oneOf: ["asus", "acer", "dell"],
    maxPrice: 5000,
  },
  {
    name: "Cooktop",
    required: ["cooktop"],
    oneOf: ["fischer", "brastemp", "electrolux"],
    maxPrice: 2000,
  },
  {
    name: "Controle de ps5",
    required: ["controle"],
    oneOf: ["PS5", "dualsense", "sony", "playstation 5"],
    maxPrice: 500,
  },
  {
    name: "Cadeira",
    required: ["cadeira", "ergonômica"],
    oneOf: ["reclinável", "escritório"],
    maxPrice: 2500,
  },
];
