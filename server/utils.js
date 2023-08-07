export function parseValue(value) {
    return typeof value === "string"
      ? `'${formatDate(value)}'`
      : formatDate(value);
  }

export function formatDate(value) {
    if (value === null) {
      return value;
    }
    const regex = /^(\d{4}-\d{2}-\d{2}).*$/;
    const match = value.toString().match(regex);
    return match ? match[1] : value;
  }