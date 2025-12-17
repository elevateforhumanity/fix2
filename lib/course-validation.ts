export function validateCourse(json: string) {
  try {
    const data = JSON.parse(json);
    if (!data.title) throw new Error('Missing course title');
    return { ok: true, data };
  } catch (err: unknown) {
    // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
    return { ok: false, error: err.message };
  }
}
