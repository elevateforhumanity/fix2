/**
 * SAM.gov API Integration
 * System for Award Management - Federal Government Contracts and Entity Data
 */

const SAM_API_BASE = 'https://api.sam.gov';
const SAM_API_KEY = process.env.SAM_GOV_API_KEY || '';

interface SAMEntity {
  entityRegistration: {
    samRegistered: string;
    ueiSAM: string;
    entityEFTIndicator: string;
    cageCode: string;
    dodaac: string;
    legalBusinessName: string;
    dbaName: string;
    purposeOfRegistrationCode: string;
    registrationStatus: string;
    registrationDate: string;
    lastUpdateDate: string;
    registrationExpirationDate: string;
    activationDate: string;
    ueiStatus: string;
    ueiExpirationDate: string;
    ueiCreationDate: string;
    publicDisplayFlag: string;
    exclusionStatusFlag: string;
    exclusionURL: string;
    dnbOpenData: string;
  };
}

interface ContractOpportunity {
  noticeId: string;
  title: string;
  solicitationNumber: string;
  department: string;
  subTier: string;
  office: string;
  postedDate: string;
  type: string;
  baseType: string;
  archiveType: string;
  archiveDate: string;
  typeOfSetAsideDescription: string;
  typeOfSetAside: string;
  responseDeadLine: string;
  naicsCode: string;
  classificationCode: string;
  active: string;
  award: any;
  pointOfContact: Array<{
    fax: string;
    type: string;
    email: string;
    phone: string;
    title: string;
    fullName: string;
  }>;
  description: string;
  organizationType: string;
  officeAddress: {
    zipcode: string;
    city: string;
    countryCode: string;
    state: string;
  };
  placeOfPerformance: {
    streetAddress: string;
    city: {
      code: string;
      name: string;
    };
    state: {
      code: string;
    };
    zip: string;
    country: {
      code: string;
      name: string;
    };
  };
  additionalInfoLink: string;
  uiLink: string;
  links: Array<{
    rel: string;
    href: string;
  }>;
  resourceLinks: string[];
}

/**
 * Search for registered entities in SAM.gov
 */
export async function searchEntities(params: {
  legalBusinessName?: string;
  ueiSAM?: string;
  cageCode?: string;
  city?: string;
  stateOrProvince?: string;
  zipCode?: string;
}): Promise<SAMEntity[]> {
  if (!SAM_API_KEY) {
    throw new Error('SAM_GOV_API_KEY not configured');
  }

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const response = await fetch(
    `${SAM_API_BASE}/entity-information/v3/entities?${queryParams.toString()}`,
    {
      headers: {
        'X-Api-Key': SAM_API_KEY,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`SAM.gov API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.entityData || [];
}

/**
 * Get entity details by UEI (Unique Entity Identifier)
 */
export async function getEntityByUEI(uei: string): Promise<SAMEntity | null> {
  if (!SAM_API_KEY) {
    throw new Error('SAM_GOV_API_KEY not configured');
  }

  const response = await fetch(
    `${SAM_API_BASE}/entity-information/v3/entities?ueiSAM=${uei}`,
    {
      headers: {
        'X-Api-Key': SAM_API_KEY,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`SAM.gov API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.entityData?.[0] || null;
}

/**
 * Check if entity is excluded from federal contracts
 */
export async function checkExclusions(params: {
  name?: string;
  uei?: string;
  cageCode?: string;
}): Promise<boolean> {
  if (!SAM_API_KEY) {
    throw new Error('SAM_GOV_API_KEY not configured');
  }

  const queryParams = new URLSearchParams();
  if (params.name) queryParams.append('name', params.name);
  if (params.uei) queryParams.append('ueiSAM', params.uei);
  if (params.cageCode) queryParams.append('cageCode', params.cageCode);

  const response = await fetch(
    `${SAM_API_BASE}/entity-information/v3/exclusions?${queryParams.toString()}`,
    {
      headers: {
        'X-Api-Key': SAM_API_KEY,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`SAM.gov API error: ${response.statusText}`);
  }

  const data = await response.json();
  return (data.exclusionDetails?.length || 0) > 0;
}

/**
 * Search contract opportunities
 */
export async function searchOpportunities(params: {
  keyword?: string;
  naics?: string;
  state?: string;
  postedFrom?: string;
  postedTo?: string;
  limit?: number;
}): Promise<ContractOpportunity[]> {
  if (!SAM_API_KEY) {
    throw new Error('SAM_GOV_API_KEY not configured');
  }

  const queryParams = new URLSearchParams();
  if (params.keyword) queryParams.append('q', params.keyword);
  if (params.naics) queryParams.append('naics', params.naics);
  if (params.state) queryParams.append('state', params.state);
  if (params.postedFrom) queryParams.append('postedFrom', params.postedFrom);
  if (params.postedTo) queryParams.append('postedTo', params.postedTo);
  queryParams.append('limit', String(params.limit || 10));

  const response = await fetch(
    `${SAM_API_BASE}/opportunities/v2/search?${queryParams.toString()}`,
    {
      headers: {
        'X-Api-Key': SAM_API_KEY,
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`SAM.gov API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.opportunitiesData || [];
}

/**
 * Search workforce development opportunities
 * NAICS codes for training/education services
 */
export async function searchWorkforceOpportunities(state: string = 'IN'): Promise<ContractOpportunity[]> {
  const workforceNAICS = [
    '611513', // Apprenticeship Training
    '611519', // Other Technical and Trade Schools
    '611699', // All Other Miscellaneous Schools and Instruction
    '624310', // Vocational Rehabilitation Services
  ];

  const opportunities: ContractOpportunity[] = [];

  for (const naics of workforceNAICS) {
    try {
      const results = await searchOpportunities({
        naics,
        state,
        limit: 25,
      });
      opportunities.push(...results);
    } catch (error) {
      console.error(`Error fetching opportunities for NAICS ${naics}:`, error);
    }
  }

  return opportunities;
}

/**
 * Verify employer partner is registered and not excluded
 */
export async function verifyEmployerPartner(params: {
  name: string;
  uei?: string;
}): Promise<{
  isRegistered: boolean;
  isExcluded: boolean;
  entity: SAMEntity | null;
}> {
  try {
    const entities = await searchEntities({
      legalBusinessName: params.name,
      ueiSAM: params.uei,
    });

    const entity = entities[0] || null;
    const isRegistered = !!entity;
    const isExcluded = isRegistered
      ? await checkExclusions({ uei: entity.entityRegistration.ueiSAM })
      : false;

    return {
      isRegistered,
      isExcluded,
      entity,
    };
  } catch (error) {
    console.error('Error verifying employer partner:', error);
    throw error;
  }
}
