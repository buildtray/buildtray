import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const websockets: WebSocket[] = [];

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
async function handleSession(websocket: any) {
  websocket.accept();
  websocket.addEventListener("message", async ({ data }: { data: any }) => {
    websocket.send(JSON.stringify({ message: "Hello from the server" }));
  });

  websocket.addEventListener("close", async (event: any) => {
    console.log(event);
  });
}

export const websocketHandler = async (request: Request) => {
  const upgradeHeader = request.headers.get("Upgrade");
  if (upgradeHeader !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const [client, server] = Object.values(new WebSocketPair());
  // add to add to list
  websockets.push(client);

  // handle the connection
  await handleSession(server);

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
};
