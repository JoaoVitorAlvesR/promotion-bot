import { Filter } from "./types";

export const filters: Filter[] = [
  {
    name: "TV",
    required: ["tv", "samsung", "55", "neo", "qled"],
    // oneOf: ["55", "qled", "neo"],
    maxPrice: 5000,
  },
  {
    name: "Notebook ASUS",
    required: ["notebook"],
    oneOf: ["asus", "acer", "dell"],
    maxPrice: 3000,
  },
  {
    name: "Cooktop",
    required: ["cooktop"],
    oneOf: ["fischer", "brastemp", "electrolux"],
    maxPrice: 1500,
  },
  // {
  //   name: "teste",
  //   required: ["ps5"],
  //   // oneOf: ["fischer", "brastemp", "electrolux"],
  //   maxPrice: 5000,
  // },
];
