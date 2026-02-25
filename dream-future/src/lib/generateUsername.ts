export function generateUsername(name: string) {
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

    if (!name) return `${randomNumber}`;

  const cleanName = name.toLowerCase().replace(/\s+/g, "-");
  return `${cleanName}@${randomNumber}`;
}
