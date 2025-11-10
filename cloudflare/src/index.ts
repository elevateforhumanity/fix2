export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)
    if (url.hostname === "www.elevateforhumanity.org") {
      url.hostname = "elevateforhumanity.org"
      return Response.redirect(url.toString(), 301)
    }
    return new Response("ok")
  }
} satisfies ExportedHandler
