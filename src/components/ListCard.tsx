import React from "react";
import Image from "@/components/basic/Image";

import type { Product } from "@/types";

function ListCard({ images, title, description }: Product) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-56 flex-none bg-neutral">
        <Image src={images[0]} alt="product-card-image" className="h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="">{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
