// Lightweight nationalities data with country codes
export const nationalities = [
  { code: 'AF', name: 'Afghan' },
  { code: 'AL', name: 'Albanian' },
  { code: 'DZ', name: 'Algerian' },
  { code: 'AR', name: 'Argentine' },
  { code: 'AU', name: 'Australian' },
  { code: 'AT', name: 'Austrian' },
  { code: 'BD', name: 'Bangladeshi' },
  { code: 'BE', name: 'Belgian' },
  { code: 'BR', name: 'Brazilian' },
  { code: 'CA', name: 'Canadian' },
  { code: 'CN', name: 'Chinese' },
  { code: 'CO', name: 'Colombian' },
  { code: 'DK', name: 'Danish' },
  { code: 'EG', name: 'Egyptian' },
  { code: 'FI', name: 'Finnish' },
  { code: 'FR', name: 'French' },
  { code: 'DE', name: 'German' },
  { code: 'GH', name: 'Ghanaian' },
  { code: 'GR', name: 'Greek' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'IN', name: 'Indian' },
  { code: 'ID', name: 'Indonesian' },
  { code: 'IE', name: 'Irish' },
  { code: 'IL', name: 'Israeli' },
  { code: 'IT', name: 'Italian' },
  { code: 'JP', name: 'Japanese' },
  { code: 'JO', name: 'Jordanian' },
  { code: 'KE', name: 'Kenyan' },
  { code: 'KW', name: 'Kuwaiti' },
  { code: 'LB', name: 'Lebanese' },
  { code: 'MY', name: 'Malaysian' },
  { code: 'MX', name: 'Mexican' },
  { code: 'MA', name: 'Moroccan' },
  { code: 'NL', name: 'Dutch' },
  { code: 'NZ', name: 'New Zealander' },
  { code: 'NG', name: 'Nigerian' },
  { code: 'NO', name: 'Norwegian' },
  { code: 'PK', name: 'Pakistani' },
  { code: 'PH', name: 'Filipino' },
  { code: 'PL', name: 'Polish' },
  { code: 'PT', name: 'Portuguese' },
  { code: 'QA', name: 'Qatari' },
  { code: 'RU', name: 'Russian' },
  { code: 'SA', name: 'Saudi' },
  { code: 'SG', name: 'Singaporean' },
  { code: 'ZA', name: 'South African' },
  { code: 'KR', name: 'South Korean' },
  { code: 'ES', name: 'Spanish' },
  { code: 'SE', name: 'Swedish' },
  { code: 'CH', name: 'Swiss' },
  { code: 'TW', name: 'Taiwanese' },
  { code: 'TH', name: 'Thai' },
  { code: 'TR', name: 'Turkish' },
  { code: 'AE', name: 'Emirati' },
  { code: 'GB', name: 'British' },
  { code: 'US', name: 'American' },
  { code: 'VN', name: 'Vietnamese' },
] as const;

// Helper function to get nationality name by code
export const getNationalityName = (code: string): string => {
  const nationality = nationalities.find(n => n.code === code);
  return nationality?.name || code;
};

// Helper function to get nationality code by name
export const getNationalityCode = (name: string): string => {
  const nationality = nationalities.find(n => n.name === name);
  return nationality?.code || name;
};