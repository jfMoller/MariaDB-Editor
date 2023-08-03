export function capitalizeFirstLetter(string: string) {
    const [firstLetter, ...remainingLetters] = string;
    return firstLetter.toUpperCase() + remainingLetters.join('');
  }