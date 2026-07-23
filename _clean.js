const fs = require("fs");
const path = "C:/Users/guisa/OneDrive/Desktop/Mana_site/app/api/submit/route.ts";

// Read the file
let content = fs.readFileSync(path, "utf8");

// Remove any XML-like tags
content = content.replace(/<\/?[^>]+>/g, "");

// Remove extra blank lines at the end
content = content.trimEnd() + "\n";

// Write back
fs.writeFileSync(path, content, "utf8");

console.log("Lines after cleanup:", content.split("\n").length);
console.log("File cleaned successfully");

