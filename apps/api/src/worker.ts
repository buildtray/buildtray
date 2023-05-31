import { websocketHandler } from "./websocket";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/":
        return new Response("Use realtime /ws");
      case "/ws":
        return websocketHandler(request);
      default:
        return new Response("Not found", { status: 404 });
    }
  } catch (err: any) {
    return new Response(err.toString());
  }
}
