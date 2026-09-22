import { ICatalogItems, ICatalogOption } from '@/app/shared/interfaces';

const TOKEN_LABELS: Record<string, string> = {
  ELEVE: 'Élevé',
  MOYEN: 'Moyen',
  FAIBLE: 'Faible',
  YES: 'Oui',
  MAYBE: 'Peut-être',
  NO: 'Non',
  NAMED: 'Identifiée',
  ANONYMOUS: 'Anonyme',
  DISCUSS: 'À discuter',
  DRAFT: 'Brouillon',
  SUBMITTED: 'Soumis'
};

export function humanizeToken(value: string): string {
  if (TOKEN_LABELS[value]) {
    return TOKEN_LABELS[value];
  }

  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function normalizeCatalogItems(items: ICatalogItems | undefined): ICatalogOption[] {
  if (!items?.length) {
    return [];
  }

  return items.map((item) =>
    typeof item === 'string'
      ? { value: item, label: humanizeToken(item) }
      : { value: item.value, label: item.label ?? humanizeToken(item.value) }
  );
}

export function catalogLabel(items: ICatalogItems | undefined, value: string): string {
  const normalized = normalizeCatalogItems(items);
  return normalized.find((item) => item.value === value)?.label ?? humanizeToken(value);
}
