export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function capitalize(str: string) {
  if (!str) return '';
  return str[0].toUpperCase() + str.substr(1);
}

export function toPascalCase(str: string) {
  return capitalize(toCamelCase(str));
}

export function cleanFromObject<T>(obj: object, blacklist: any[]) {
  return Object.keys(obj).reduce((newObj, key) => {
    // @ts-expect-error
    const value = obj[key];
    if (blacklist.includes(value)) return newObj;
    return { ...newObj, [key]: value };
  }, {}) as T;
}

/**
 *
 * @param hex a hexidecimal string
 * @returns a hexidecimal string OR an empty string if there was an issue
 */
export function incrementHex(hex: string) {
  const intified = parseInt(hex, 16);
  if (isNaN(intified)) return '';
  const newHex = (intified + 1).toString(16);
  return newHex;
}
