import type { Product } from "@/types";
import fs from "node:fs";
import path from "node:path";

type Source = {
  ids: string[];
  map: Record<string, Product>;
};

const DIR = path.join(process.cwd(), "public/products");

const getAllProductIDs = async () =>
  fs.promises.readdir(DIR).then((ids) => ids.sort());

let temp: Source = { ids: [], map: {} };

// get all folders under DIR
const getSource = async (): Promise<Source> => {
  if (temp.ids.length > 0) return temp;
  const tempMap: Source["map"] = {};
  const ids = await getAllProductIDs();
  await Promise.all(
    ids.map(async (id) => {
      const product = await fs.promises.readFile(
        path.join(DIR, id, "data.json"),
        "utf8"
      );
      tempMap[id] = JSON.parse(product) as Product;
    })
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
    return ids.slice(offset, offset + size).map((id) => map[id]);
  },
  ids: async () => [],
};
