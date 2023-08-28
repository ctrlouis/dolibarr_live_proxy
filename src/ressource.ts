const DOLIBARR_RESSOURCES_ALLOWED = Deno.env.get("DOLIBARR_RESSOURCE_ALLOWED");
const DOLIBARR_CATEGORIE_REQUIRED = Deno.env.get("DOLIBARR_CATEGORIE_REQUIRED") === 'TRUE' || Deno.env.get("DOLIBARR_CATEGORIE_REQUIRED") === 'true';

const allowedRessources = String(DOLIBARR_RESSOURCES_ALLOWED).split(",");

const getRessourceName = (url: string) => {
    let ressourceName: null|string = null;
    const ressources = allowedRessources.join("|");
    const regex = new RegExp(`\/api\/index.php\/(${ressources})`, 'g');
    const result = regex.exec(url);
    if (result) {
        ressourceName = result[1];
    }
    return ressourceName;
}

const ressourceConditions = (ressourceName: string, url: string) => {
    let conditionsRespected: boolean;
    switch (ressourceName) {
        case 'products':
            conditionsRespected = productsConditions(url);
            break;
    
        default:
            conditionsRespected = true;
            break;
    }
    return conditionsRespected;
}

const productsConditions = (url) => {
    let conditionsRespected = true;

    if (DOLIBARR_CATEGORIE_REQUIRED) {
        const regex = new RegExp("&category=[0-9]+", 'g');
        const result = regex.exec(url);
        if (!result) {
            conditionsRespected = false;
        }
    }
    
    return conditionsRespected;
}

export {
    getRessourceName,
    ressourceConditions,
}