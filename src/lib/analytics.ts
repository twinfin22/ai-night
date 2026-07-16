const ga4Pattern = /^G-[A-Z0-9]+$/;
const placeholderIds = new Set(['G-XXXXXXXXXX', 'G-PLACEHOLDER']);

export function isValidGa4Id(value: string | undefined): value is string {
  const id = value?.trim() ?? '';
  return ga4Pattern.test(id) && !placeholderIds.has(id);
}
