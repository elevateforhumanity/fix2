import { scanRepository, analyzeRepository } from './repo-analyzer';
import {
  normalizeCourseMetadata,
  validateCourseMetadata,
} from './course-normalizer';
import { checkBrokenLinks, checkCourseStructure } from './link-checker';
export async function runAutopilot(name: string, payload: unknown = {}) {
  return { ok: true };
}
export async function runAutopilots(
  metadata: Record<string, unknown>,
  repo = 'elevateforhumanity/fix2'
) {
  try {
    // Scan repository
    const tree = await scanRepository(repo);
    // Normalize metadata
    const normalized = normalizeCourseMetadata(metadata);
    // Validate metadata
    const validation = validateCourseMetadata(normalized);
    // Check for broken links
    const linkCheck = checkBrokenLinks(tree, normalized);
    // Check course structure
    const structure = normalized.slug
      // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'string'.
      ? checkCourseStructure(tree, normalized.slug)
      : null;
    return {
      ok: validation.valid,
      normalized,
      validation,
      linkCheck,
      structure,
      errors: validation.errors,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      error: error.message,
    };
  }
}
export async function runFullAnalysis(repo = 'elevateforhumanity/fix2') {
  try {
    const { files, analysis } = await analyzeRepository(repo);
    return {
      ok: true,
      files,
      analysis,
      summary: {
        totalFiles: analysis.totalFiles,
        courseFiles: analysis.courses,
        codeFiles: analysis.components + analysis.pages + analysis.api,
      },
    };
  } catch (error: unknown) {
    return {
      ok: false,
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      error: error.message,
    };
  }
}
