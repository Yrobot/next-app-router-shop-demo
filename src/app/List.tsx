"use client";

import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "@/components/basic/Loading";
import ListCard from "@/components/ListCard";

import type { Product } from "@/types";

const PAGE_SIZE = 10;

function List({
  initialItems = [],
  fetch,
  size,
}: {
  size: number;
  initialItems: Product[];
  fetch: (params: { offset: number }) => Promise<Product[]>;
}) {
  const dataRef = useRef({
    fetching: false,
  });
  const [pages, setPages] = useState<Product[][]>([initialItems]);
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
        <div className="flex w-96 items-center justify-center py-4" key={-1}>
          <Loading size="lg" />
        </div>
      }
      className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4"
      element="div"
    >
      {items.map((product) => (
        <ListCard key={product.id} {...product} />
      ))}
    </InfiniteScroll>
  );
}

export default List;
