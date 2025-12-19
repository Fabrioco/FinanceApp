export function categoryColor(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215)).toString(16);

  return `#${color.padStart(6, "0")}`;
}
