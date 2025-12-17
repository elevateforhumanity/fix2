/**
 * Autopilot API Endpoint
 *
 * Provides API access to the autopilot worker
 * Can be called from anywhere in the application
 */

import type { Request, Response } from 'express';

// This will be imported dynamically to avoid build issues
let autopilotWorker: unknown = null;

async function getAutopilotWorker() {
  if (!autopilotWorker) {
    try {
      // Try to load the autopilot worker if it exists
      // This is optional and may not be present in all deployments
      const module = await import('../../workers/self-healing-autopilot.js');
      autopilotWorker = module.default || module;
    } catch (error) {
      return null;
    }
  }
  return autopilotWorker;
}

/**
 * GET /api/autopilot/status
 * Get autopilot status
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function getStatus(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    res.json({
      status: 'ok',
      // @ts-expect-error TS2339: Property 'isRunning' does not exist on type 'unknown'.
      running: worker.isRunning,
      config: {
        // @ts-expect-error TS2339: Property 'config' does not exist on type 'unknown'.
        hasVercelToken: !!worker.config.VERCEL_TOKEN,
        // @ts-expect-error TS2339: Property 'config' does not exist on type 'unknown'.
        hasSupabaseUrl: !!worker.config.VITE_SUPABASE_URL,
        // @ts-expect-error TS2339: Property 'config' does not exist on type 'unknown'.
        hasStripeKey: !!worker.config.VITE_STRIPE_PUBLISHABLE_KEY,
        // @ts-expect-error TS2339: Property 'config' does not exist on type 'unknown'.
        siteUrl: worker.config.VITE_SITE_URL || 'not set',
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to get autopilot status',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

/**
 * POST /api/autopilot/health-check
 * Trigger manual health check
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function triggerHealthCheck(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    // @ts-expect-error TS2339: Property 'checkHealth' does not exist on type 'unknown'.
    const health = await worker.checkHealth();

    res.json({
      status: 'ok',
      health,
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Health check failed',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

/**
 * POST /api/autopilot/self-heal
 * Trigger manual self-heal
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function triggerSelfHeal(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    // @ts-expect-error TS2339: Property 'selfHeal' does not exist on type 'unknown'.
    const success = await worker.selfHeal();

    res.json({
      status: 'ok',
      healed: success,
      message: success ? 'Self-heal successful' : 'Self-heal failed',
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Self-heal failed',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

/**
 * POST /api/autopilot/sync-secrets
 * Sync secrets to GitHub and Vercel
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function syncSecrets(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    const results = {
      // @ts-expect-error TS2339: Property 'syncToGitHub' does not exist on type 'unknown'.
      github: await worker.syncToGitHub(),
      // @ts-expect-error TS2339: Property 'syncToVercel' does not exist on type 'unknown'.
      vercel: await worker.syncToVercel(),
    };

    res.json({
      status: 'ok',
      synced: results,
      message: 'Secrets synced successfully',
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Secret sync failed',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

/**
 * POST /api/autopilot/start
 * Start the autopilot worker
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function startWorker(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    // @ts-expect-error TS2339: Property 'isRunning' does not exist on type 'unknown'.
    if (worker.isRunning) {
      return res.json({
        status: 'ok',
        message: 'Autopilot already running',
      });
    }

    // @ts-expect-error TS2339: Property 'start' does not exist on type 'unknown'.
    await worker.start();

    res.json({
      status: 'ok',
      message: 'Autopilot started successfully',
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to start autopilot',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

/**
 * POST /api/autopilot/stop
 * Stop the autopilot worker
 */
// @ts-expect-error TS7030: Not all code paths return a value.
export async function stopWorker(req: Request, res: Response) {
  try {
    const worker = await getAutopilotWorker();

    if (!worker) {
      return res.status(503).json({
        error: 'Autopilot worker not available',
      });
    }

    // @ts-expect-error TS2339: Property 'stop' does not exist on type 'unknown'.
    worker.stop();

    res.json({
      status: 'ok',
      message: 'Autopilot stopped successfully',
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to stop autopilot',
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      message: error.message,
    });
  }
}

// Export all handlers
export default {
  getStatus,
  triggerHealthCheck,
  triggerSelfHeal,
  syncSecrets,
  startWorker,
  stopWorker,
};
