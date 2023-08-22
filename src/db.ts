import type { Product } from "@/types";
import fs from "node:fs";
import path from "node:path";

type Source = {
  ids: string[];
  map: Record<string, Product>;
};

const DIR = path.join(process.cwd(), "public/products");

// const getAllProductIDs = async () =>
//   fs.promises.readdir(DIR).then((ids) => ids.sort());

const ids = [
  "snare-boot",
  "neptune-boot",
  "arena-zip-boot",
  "pin-boot",
  "hanra-shirt",
  "meteor-shirt",
  "hurst-shirt",
  "monte-shirt",
  "ekktar-crew-jumper",
  "rye-crew-jumper",
  "trias-hoody",
  "wherry-overhead-hoody",
  "merino-open-cardigan",
  "rise-crew",
  "heartbreaker-crew",
  "posie-crew",
  "mens-henning-u-scoop",
  "mens-tonic-c",
  "brace-tonic-crew",
  "henning-ss-crew",
  "dknypure-tee-with-underlayer",
  "dknypure-short-sleeve-tee",
  "short-sleeve-tee-with-mesh",
  "dknypure-poncho-top",
  "lightweight-button-thru-poncho",
  "dknypure-v-neck-pullover",
  "v-neck-pullover",
  "3-4-sleeve-crewneck-pullover",
  "sporty-crewneck-pullover",
  "runway-color-blocked-dress",
  "mixed-stripe-sleeveless-dress",
  "color-block-crewneck-dress",
  "color-block-sheath-dress",
  "elbow-sleeve-cold-shoulder-dress",
  "strapless-dress-with-flare-skirt",
  "dknypure-racerback-tank-dress",
  "dknypure-drape-neck-dress",
  "double-racer-back-dress",
  "bb-testing-3-4-sleeve-crewneck-pullover",
];

let temp: Source = { ids: [], map: {} };

// get all folders under DIR
const getSource = async (): Promise<Source> => {
  if (temp.ids.length > 0) return temp;
  const tempMap: Source["map"] = {};
  // const ids = await getAllProductIDs();
  await Promise.all(
    ids.map(async (id) => {
      const product = await fs.promises.readFile(
        path.join(DIR, id, "data.json"),
        "utf8",
      );
      tempMap[id] = JSON.parse(product) as Product;
    }),
  );
  temp = {
    ids,
    map: tempMap,
  };
  return temp;
};

export default {
  list: async ({ offset = 0, size = 10 } = {}) => {
    const { ids, map } = await getSource();
    return ids.slice(offset, offset + size).map((id) => {
      const { ...item } = map[id] || {};
      return item;
    });
  },
  ids: async () => {
    return (await getSource()).ids;
  },
  size: async () => {
    return (await getSource()).ids.length;
  },
  detail: async (id: string) => (await getSource()).map[id],
};
