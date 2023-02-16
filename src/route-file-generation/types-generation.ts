export const routesConfigDirectoryName = "typed-routing";

export async function generateRoutes() {
    console.log('Generating routes...')
    const fs = await import('fs');
    const path = await import('path');
    const dirName = path.join(process.cwd(), "src", routesConfigDirectoryName);
    const cityPlan = await import("@qwik-city-plan");
    const routes = cityPlan.routes.map(r => r[3] as string);
    if (!fs.existsSync(dirName)) { fs.mkdirSync(dirName); }
    const filePath = path.join(process.cwd(), "src", routesConfigDirectoryName, "route-types.d.ts");
    const routeTypes = buildRouteTypesString(routes);
    fs.writeFileSync(filePath, routeTypes)
}


function buildRouteTypesString(routes: string[]) {
    let string = `//This is an automatically generated file. There is no need to update it manually. Manual updates will be overridden.\n`
    string += 'type ExternalUrl = `http${string}` | `www${string}` | `mailto${string}` | `tel${string}` | `sms${string}` | `ftp${string}` | `file${string}` | `data${string}` | `javascript${string}` | `ws${string}` | `wss${string}` | `about${string}` | `blob${string}` | `chrome${string}` | `chrome-extension${string}` | `edge${string}` | `feed${string}` | `filesystem${string}`\n'
    string += `type RoutePath = ExternalUrl`;


    for (const route of routes) {
        let routeAsStringLiteralTemplateType = "";
        const bracketStack = [];
        for (let i = 0; i < route.length; i++) {
            const char = route[i];
            if (char === "[") {
                bracketStack.push(char);
                routeAsStringLiteralTemplateType += "${string"
            } else if (char === "]") {
                bracketStack.pop();
                routeAsStringLiteralTemplateType += "}"
            } else {
                if (bracketStack.length === 0) { routeAsStringLiteralTemplateType += char; }
            }
        }
        string += "| `" + routeAsStringLiteralTemplateType + "`"
    }

    return string;
}