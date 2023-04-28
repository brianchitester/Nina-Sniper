import React, { useState } from "react";
import { useNina } from "../context/nina";

type sortOption = "lowest" | "ratio" | "highPrice" | "lowPrice";

function List() {
  const [sortOption, setSortOption] = useState<sortOption>("lowest");
  const { allReleases } = useNina();

  const releaseToDisplay = allReleases
    ?.filter((release: any) => release.accountData.release.remainingSupply > 0)
    .sort((a: any, b: any) => {
      switch (sortOption) {
        case "lowest":
          return (
            a.accountData.release.remainingSupply -
            b.accountData.release.remainingSupply
          );
        case "ratio":
          return (
            a.accountData.release.remainingSupply /
              a.accountData.release.totalSupply -
            b.accountData.release.remainingSupply /
              b.accountData.release.totalSupply
          );
        case "highPrice":
          return b.accountData.release.price - a.accountData.release.price;
        case "lowPrice":
          return a.accountData.release.price - b.accountData.release.price;
        default:
          return 0;
      }
    });

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", margin: "1em 0" }}>
        <span>Sory by: </span>
        <button
          onClick={() => setSortOption("lowest")}
          disabled={sortOption === "lowest"}
        >
          lowest total supply
        </button>
        <button
          onClick={() => setSortOption("ratio")}
          disabled={sortOption === "ratio"}
        >
          lowest supply ratio
        </button>
        <button
          onClick={() => setSortOption("highPrice")}
          disabled={sortOption === "highPrice"}
        >
          highest price
        </button>
        <button
          onClick={() => setSortOption("lowPrice")}
          disabled={sortOption === "lowPrice"}
        >
          lowest price
        </button>
      </div>
      <div>
        {releaseToDisplay &&
          releaseToDisplay.map((release: any) => {
            return (
              <div
                key={release.publicKey}
                style={{ display: "flex", gap: "1em", margin: "1em 0" }}
              >
                <img
                  src={release.metadata.image}
                  style={{ width: "64px", height: "64px" }}
                  loading="lazy"
                  alt={release.metadata.name}
                />
                <a href={release.metadata.external_url}>
                  <span>{release.metadata.name}</span>
                </a>
                <span>
                  {release.accountData.release.remainingSupply}/
                  {release.accountData.release.totalSupply}
                </span>
                <span>${release.accountData.release.price / 1000000}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default List;
