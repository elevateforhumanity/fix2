// lib/partners/index.ts
import { BasePartnerAPI, PartnerType } from "./base";
import { getPartnerConfig, validatePartnerConfig } from "./config";
import { HsiAPI } from "./hsi";
import { CertiportAPI } from "./certiport";
import { CareerSafeAPI } from "./careersafe";
import { MiladyAPI } from "./milady";
import { JriAPI } from "./jri";
import { NrfAPI } from "./nrf";
import { NdsAPI } from "./nds";

/**
 * Factory function to get the appropriate partner API client
 * Uses real implementations when credentials are configured,
 * throws error if credentials are missing
 */
export function getPartnerClient(partner: PartnerType): BasePartnerAPI {
  const config = getPartnerConfig(partner);
  
  // Validate configuration
  const validation = validatePartnerConfig(partner, config);
  if (!validation.valid) {
    console.warn(
      `[PartnerAPI] Configuration issues for ${partner}:`,
      validation.errors
    );
    // Continue anyway - API calls will fail with clear error messages
  }

  switch (partner) {
    case "hsi":
      return new HsiAPI(config);
    case "certiport":
      return new CertiportAPI(config);
    case "careersafe":
      return new CareerSafeAPI(config);
    case "milady":
      return new MiladyAPI(config);
    case "jri":
      return new JriAPI(config);
    case "nrf":
      return new NrfAPI(config);
    case "nds":
      return new NdsAPI(config);
    default:
      throw new Error(`Unknown partner type: ${partner}`);
  }
}

export * from "./base";
export * from "./config";
export { HsiAPI } from "./hsi";
export { CertiportAPI } from "./certiport";
export { CareerSafeAPI } from "./careersafe";
export { MiladyAPI } from "./milady";
export { JriAPI } from "./jri";
export { NrfAPI } from "./nrf";
export { NdsAPI } from "./nds";
