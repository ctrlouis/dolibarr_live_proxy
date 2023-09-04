import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { getRessourceName, ressourceConditions } from "./ressource.ts";

const ORIGIN = Deno.env.get("ORIGIN") ? Deno.env.get("ORIGIN") : "*" ;
const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 1993 ;
const DOLIBARR_API_BASE = Deno.env.get("DOLIBARR_API_BASE");
const DOLIBARR_API_KEY = Deno.env.get("DOLIBARR_API_KEY");

const handler = async (ctx) => {
    try {
        const baseUrl = new URL(ctx.request.url);
        
        const ressourceName = getRessourceName(baseUrl.toString());
        if (ressourceName === null) {
            throw new Error(`Ressource not allowed`);
        }

        const conditionsRespected = ressourceConditions(ressourceName, baseUrl.toString());
        if (!conditionsRespected) {
            throw new Error(`Conditions not respected`);
        }

        const params = baseUrl.href.replace(baseUrl.origin,'');
        const fetchUrl = `https://${DOLIBARR_API_BASE}${params}`;
        const jsonResponse  = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "DOLAPIKEY": DOLIBARR_API_KEY,
            },
        });
        const jsonData = await jsonResponse.json();
        ctx.response.headers.set("Content-Type", "application/json");
        ctx.response.body = jsonData;
    } catch (error) {
        ctx.response.body = error.message;
    }
};

const app = new Application();
app.use(oakCors({ origin: ORIGIN, }));
app.use(logger.logger);
app.use(logger.responseTime);
app.use(handler);

console.info(`Web server listening on port ${PORT}`);
await app.listen({ port: PORT });

