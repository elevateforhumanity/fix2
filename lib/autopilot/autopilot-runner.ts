import { buildCourse } from './ai-course-builder';
import { scanRepo } from './repo-scanner';
import { enhanceImages } from './media-enhancer';
import { generateSitemap } from './sitemap-generator';
import { prepareDeploy } from './deploy-prep';

export async function runAutopilot(type: string, payload: unknown = {}) {
  switch (type) {
    case 'course':
      // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type '{ title: s...
      return await buildCourse(payload);
    case 'scan':
      return await scanRepo();
    case 'media':
      return await enhanceImages();
    case 'sitemap':
      return await generateSitemap();
    case 'deploy':
      return await prepareDeploy();
    default:
      return { error: 'Unknown autopilot mode' };
  }
}
