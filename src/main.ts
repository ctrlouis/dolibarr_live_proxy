import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";

// const ORIGIN = Deno.env.get("ORIGIN") ? Deno.env.get("ORIGIN") : "*" ;
const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 1993 ;
const DOLIBARR_API_BASE = Deno.env.get("DOLIBARR_API_BASE");
const DOLIBARR_API_KEY = Deno.env.get("DOLIBARR_API_KEY");

const handler = async (ctx) => {
    const baseUrl = new URL(ctx.request.url);
    const params = baseUrl.href.replace(baseUrl.origin,'');
    const fetchUrl = `https://${DOLIBARR_API_BASE}${params}`;
    getRessourceName(baseUrl);
    // try {
    //     const jsonResponse  = await fetch(fetchUrl, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "DOLAPIKEY": DOLIBARR_API_KEY,
    //         },
    //     });
    //     const jsonData = await jsonResponse.json();
    //     ctx.response.headers.set("Content-Type", "application/json");
    //     ctx.response.body = jsonData;
    // } catch (error) {
    //     ctx.response.body = error.message;
    // }
};

const getRessourceName = (url) => {
    const expression = /https?:\/\/.*\/api\/index.php\/(.*)\??/;
    const regex = new RegExp(expression, url);
    console.log(regex);
}

const app = new Application();
// app.use(oakCors({ origin: ORIGIN, }));
app.use(oakCors());
app.use(handler);

console.info(`Web server listening on port ${PORT}`);
await app.listen({ port: PORT });
