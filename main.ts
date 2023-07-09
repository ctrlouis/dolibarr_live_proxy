import { serve } from "https://deno.land/std@0.193.0/http/server.ts";

const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 1993 ;
const DOLIBARR_API_BASE = Deno.env.get("DOLIBARR_API_BASE");
const DOLIBARR_API_KEY = Deno.env.get("DOLIBARR_API_KEY");

const handler = async (request: Request): Promise<Response> => {
    const baseUrl = new URL(request.url);
    const params = baseUrl.href.replace(baseUrl.origin,'');
    const fetchUrl = `https://${DOLIBARR_API_BASE}${params}`;
    console.log(fetchUrl);
    console.log(DOLIBARR_API_KEY);
    let res;
    try {
        const jsonResponse  = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "DOLAPIKEY": DOLIBARR_API_KEY,
            },
        });
        const jsonData = await jsonResponse.json();
        res = jsonData;
    } catch (error) {
        console.error(error);
        res = error.message;
    }
    
    return new Response(JSON.stringify(res), { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`);
await serve(handler, { port: PORT });