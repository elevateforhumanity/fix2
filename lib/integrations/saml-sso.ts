/**
 * SAML SSO Integration
 * Handles generic SAML 2.0 single sign-on
 */

interface SAMLConfig {
  entryPoint: string;
  issuer: string;
  cert: string;
  callbackUrl: string;
  identifierFormat?: string;
}

interface SAMLAssertion {
  nameID: string;
  nameIDFormat: string;
  sessionIndex: string;
  attributes: Record<string, string | string[]>;
}

interface SAMLResponse {
  assertion: SAMLAssertion;
  issuer: string;
  inResponseTo?: string;
}

class SAMLSSOClient {
  private config: SAMLConfig;

  constructor(config: SAMLConfig) {
    this.config = config;
  }

  getLoginUrl(relayState?: string): string {
    const samlRequest = this.generateSAMLRequest();
    const encodedRequest = Buffer.from(samlRequest).toString('base64');

    const params = new URLSearchParams({
      SAMLRequest: encodedRequest,
      ...(relayState && { RelayState: relayState }),
    });

    return `${this.config.entryPoint}?${params.toString()}`;
  }

  private generateSAMLRequest(): string {
    const id = `_${this.generateId()}`;
    const issueInstant = new Date().toISOString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<samlp:AuthnRequest
  xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  ID="${id}"
  Version="2.0"
  IssueInstant="${issueInstant}"
  Destination="${this.config.entryPoint}"
  AssertionConsumerServiceURL="${this.config.callbackUrl}"
  ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST">
  <saml:Issuer>${this.config.issuer}</saml:Issuer>
  <samlp:NameIDPolicy
    Format="${this.config.identifierFormat || 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'}"
    AllowCreate="true"/>
</samlp:AuthnRequest>`;
  }

  async validateResponse(samlResponse: string): Promise<SAMLResponse> {
    const decoded = Buffer.from(samlResponse, 'base64').toString('utf-8');
    
    await this.verifySignature(decoded);
    
    return this.parseAssertion(decoded);
  }

  private async verifySignature(xml: string): Promise<void> {
    const signatureMatch = xml.match(/<ds:SignatureValue>(.*?)<\/ds:SignatureValue>/s);
    if (!signatureMatch) {
      throw new Error('No signature found in SAML response');
    }

    const crypto = await import('crypto');
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(xml);
    
    const isValid = verify.verify(this.config.cert, signatureMatch[1], 'base64');
    
    if (!isValid) {
      throw new Error('Invalid SAML signature');
    }
  }

  private parseAssertion(xml: string): SAMLResponse {
    const nameIDMatch = xml.match(/<saml:NameID[^>]*>(.*?)<\/saml:NameID>/);
    const nameIDFormatMatch = xml.match(/<saml:NameID[^>]*Format="([^"]*)"[^>]*>/);
    const sessionIndexMatch = xml.match(/SessionIndex="([^"]*)"/);
    const issuerMatch = xml.match(/<saml:Issuer[^>]*>(.*?)<\/saml:Issuer>/);
    const inResponseToMatch = xml.match(/InResponseTo="([^"]*)"/);

    if (!nameIDMatch) {
      throw new Error('No NameID found in SAML assertion');
    }

    const attributes: Record<string, string | string[]> = {};
    const attributeRegex = /<saml:Attribute[^>]*Name="([^"]*)"[^>]*>(.*?)<\/saml:Attribute>/gs;
    let attributeMatch;

    while ((attributeMatch = attributeRegex.exec(xml)) !== null) {
      const name = attributeMatch[1];
      const valueContent = attributeMatch[2];
      const valueRegex = /<saml:AttributeValue[^>]*>(.*?)<\/saml:AttributeValue>/g;
      const values: string[] = [];
      let valueMatch;

      while ((valueMatch = valueRegex.exec(valueContent)) !== null) {
        values.push(valueMatch[1]);
      }

      attributes[name] = values.length === 1 ? values[0] : values;
    }

    return {
      assertion: {
        nameID: nameIDMatch[1],
        nameIDFormat: nameIDFormatMatch?.[1] || '',
        sessionIndex: sessionIndexMatch?.[1] || '',
        attributes,
      },
      issuer: issuerMatch?.[1] || '',
      inResponseTo: inResponseToMatch?.[1],
    };
  }

  generateLogoutRequest(nameID: string, sessionIndex: string): string {
    const id = `_${this.generateId()}`;
    const issueInstant = new Date().toISOString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<samlp:LogoutRequest
  xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  ID="${id}"
  Version="2.0"
  IssueInstant="${issueInstant}"
  Destination="${this.config.entryPoint}">
  <saml:Issuer>${this.config.issuer}</saml:Issuer>
  <saml:NameID Format="${this.config.identifierFormat || 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'}">${nameID}</saml:NameID>
  <samlp:SessionIndex>${sessionIndex}</samlp:SessionIndex>
</samlp:LogoutRequest>`;
  }

  private generateId(): string {
    return Array.from({ length: 20 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }

  extractEmail(assertion: SAMLAssertion): string | null {
    if (assertion.nameIDFormat.includes('emailAddress')) {
      return assertion.nameID;
    }

    const emailAttributes = [
      'email',
      'emailAddress',
      'mail',
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    ];

    for (const attr of emailAttributes) {
      const value = assertion.attributes[attr];
      if (value) {
        return Array.isArray(value) ? value[0] : value;
      }
    }

    return null;
  }

  extractName(assertion: SAMLAssertion): { firstName?: string; lastName?: string; fullName?: string } {
    const result: { firstName?: string; lastName?: string; fullName?: string } = {};

    const firstNameAttrs = ['firstName', 'givenName', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    const lastNameAttrs = ['lastName', 'surname', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
    const fullNameAttrs = ['displayName', 'name', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    for (const attr of firstNameAttrs) {
      const value = assertion.attributes[attr];
      if (value) {
        result.firstName = Array.isArray(value) ? value[0] : value;
        break;
      }
    }

    for (const attr of lastNameAttrs) {
      const value = assertion.attributes[attr];
      if (value) {
        result.lastName = Array.isArray(value) ? value[0] : value;
        break;
      }
    }

    for (const attr of fullNameAttrs) {
      const value = assertion.attributes[attr];
      if (value) {
        result.fullName = Array.isArray(value) ? value[0] : value;
        break;
      }
    }

    return result;
  }
}

export function createSAMLSSOClient(): SAMLSSOClient | null {
  const entryPoint = process.env.SAML_ENTRY_POINT;
  const issuer = process.env.SAML_ISSUER;
  const cert = process.env.SAML_CERT;

  if (!entryPoint || !issuer || !cert) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SAML SSO not configured');
    }
    return null;
  }

  return new SAMLSSOClient({
    entryPoint,
    issuer,
    cert,
    callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/saml`,
    identifierFormat: process.env.SAML_IDENTIFIER_FORMAT,
  });
}

export const samlSSO = createSAMLSSOClient();
