export function extractFirstLetter(regex) {
  if (regex === null) return null;
  const source = regex.source;
  console.log("source:", source);
  const cleaned = source.replace(/^(\(\?!.*?\)|\(\?=.*?\))+/g, "");
  console.log("cleaned:", cleaned);
  const match = cleaned.match(/[a-z]/i);

  return match ? match[0] : null;
}
