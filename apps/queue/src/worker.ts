type Environment = {
	readonly BUILDTRAY_WEBHOOKS: Queue<any>;
};

const worker = {
	async fetch(request: Request, env: Environment): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/webhook") {

			// emit a test message
			await env.BUILDTRAY_WEBHOOKS.send({ test: 1 });
		}

		// send a response
		return new Response("Success!");
	},
	async queue(batch: MessageBatch<Error>, _env: Environment): Promise<void> {
		let messages = JSON.stringify(batch.messages);
		console.log(`consumed from our queue: ${messages}`);
	},
};

export default worker;
