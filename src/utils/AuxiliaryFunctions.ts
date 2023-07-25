export function isValidNumber(value: any): boolean {
  return !isNaN(Number(value)) && isFinite(value)
}

export function isValidOrder(value: any): boolean {
  return value === 'asc' || value === 'desc'
}

export function isStringOrNumber(value: any): boolean {
  return typeof value === 'string' || typeof value === 'number' || Array.isArray(value)
}
