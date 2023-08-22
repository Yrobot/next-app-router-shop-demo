"use client";

import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "@/components/Loading";

import type { Product } from "@/types";

type ProductListItem = Omit<Product, "description">;

const PAGE_SIZE = 10;

function List({
  initialItems = [],
  fetch,
  size,
}: {
  size: number;
  initialItems: ProductListItem[];
  fetch: (params: { offset: number }) => Promise<ProductListItem[]>;
}) {
  const dataRef = useRef({
    fetching: false,
  });
  const [pages, setPages] = useState<ProductListItem[][]>([initialItems]);
  const items = pages.flat();

  return (
    <InfiniteScroll
      initialLoad={false}
      hasMore={size > items.length}
      pageStart={0}
      loadMore={async (page: number) => {
        if (!dataRef.current.fetching) {
          try {
            dataRef.current.fetching = true;
            const data = await fetch({ offset: page * PAGE_SIZE });
            setPages((prev) => [...prev, data]);
          } finally {
            dataRef.current.fetching = false;
          }
        }
      }}
      loader={
        <li className="flex w-96 items-center justify-center py-4" key={-1}>
          <Loading size="lg" />
        </li>
      }
      className="flex flex-col items-center justify-center space-y-4"
      element="ol"
    >
      {items.map(({ id }) => (
        <li
          className="card flex h-[200px] w-[600px] items-center justify-center p-4 shadow-xl"
          key={id}
        >
          <h2 className="card-title"> {id}</h2>
        </li>
      ))}
    </InfiniteScroll>
  );
}

export default List;
