import { encoded, translations } from "./data.js";

const excluded = ["groupId", "service", "formatSize", "ca"];

const uniqueKeys = new Set();

const decoded = encoded.map((item) => {
  const itemKeys = Object.keys(item);
  itemKeys.forEach((key) => {
    if (key.includes("Id") && !excluded.includes(key)) {
      const value = item[key];
      item[key] = translations[value];
      if (!translations.hasOwnProperty(value)) {
        uniqueKeys.add(key);
      }
    }
  });
  return item;
});

console.log(decoded);
console.log(Array.from(uniqueKeys));
