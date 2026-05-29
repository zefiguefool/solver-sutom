export default async function loadDictionary(length) {
  if (this.cache[length]) {
    return this.cache[length];
  }

  const response = await fetch(`/dict/${length}.txt`);

  const text = await response.text();

  const words = text.split("\n");

  this.cache[length] = words;

  return words;
}
