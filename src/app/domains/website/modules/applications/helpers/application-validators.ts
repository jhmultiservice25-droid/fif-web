export const countWords = (value: string): number => value.trim().split(/\s+/).filter(Boolean).length;
