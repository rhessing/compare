export type MapConfig = {
  tileUrl: string;
  attribution: string;
}

export const DefaultMapConfig: MapConfig = {
  tileUrl: '//{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=t6fAKnvaPdPCucraY88YwlKjBfUHqBMvvZBIWlcp1Z9Z5FVtA02uWo6Dc9DGB2JO',
  attribution: 'Map &copy; <a href="http://jawg.io" target="_blank" class="jawg-attrib"><b>Jawg</b>Maps</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" class="osm-attrib">OpenStreetMap contributors</a>',
};

function maybeFixMapConfig(mapConfig: MapConfig) {
  // default jawg url is specified with "//" which fails when loading built index.html
  // as a file
  if (window.location.protocol === 'file:' && !mapConfig.tileUrl.includes('http:')) {
    return {
      ...mapConfig,
      tileUrl: `http:${mapConfig.tileUrl}`,
    };
  }
  return mapConfig;
}

async function fetchMapConfig(): Promise<MapConfig> {
  try {
    const response = await fetch('/frontend/config');
    const json: MapConfig = await response.json();
    if (!json?.tileUrl || !json.attribution) {
      throw new Error('config mising url or attribution');
    }
    return json;
  } catch {
    return DefaultMapConfig;
  }
}

export async function getMapConfig(): Promise<MapConfig> {
  return fetchMapConfig().then(maybeFixMapConfig);
}
