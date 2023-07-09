import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 1993 ;
const DOLIBARR_API_BASE = Deno.env.get("DOLIBARR_API_BASE");
const DOLIBARR_API_KEY = Deno.env.get("DOLIBARR_API_KEY");

const handler = async (ctx) => {
    const baseUrl = new URL(ctx.request.url);
    const params = baseUrl.href.replace(baseUrl.origin,'');
    const fetchUrl = `https://${DOLIBARR_API_BASE}${params}`;
    console.log(fetchUrl);
    console.log(DOLIBARR_API_KEY);
    try {
        const jsonResponse  = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "DOLAPIKEY": DOLIBARR_API_KEY,
            },
        });
        const jsonData = await jsonResponse.json();
        ctx.response = jsonData;
    } catch (error) {
        console.error(error);
        ctx.response = error.message;
    }
};

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(handler);

console.info(`Web server listening on port ${PORT}`);
await app.listen({ port: PORT });
