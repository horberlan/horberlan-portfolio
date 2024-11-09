function twoAndAHalfWords(input: string): string[] {
  if (typeof input !== "string") return [input];

  const words = input.split(" ");
  if (words.length <= 2) return [input];

  const secondWordIndex = 2;
  const firstPart = words.slice(0, secondWordIndex).join(" ");
  const secondPart = words.slice(secondWordIndex).join(" ");

  return [firstPart, secondPart];
}

function truncateText(text: string, maxLength: number) {
  if (!text.length) return "";
  if (text.length > maxLength) {
    const words = text.split(" ");

    let truncatedText = "";

    for (const word of words) {
      if ((truncatedText + word).length > maxLength) {
        break;
      }
      truncatedText += word + " ";
    }

    truncatedText = truncatedText.trim().replace(/,\s*$/, "") + "...";

    return truncatedText;
  }

  return text;
}

function redirectTo(url: string) {
  if (url) window.location.href = url;
  return;
}

export { twoAndAHalfWords, truncateText, redirectTo };
