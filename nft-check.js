async function checkNFT(address){

const response =
await fetch(
`https://tonapi.io/v2/accounts/${address}/nfts?limit=1000`
);

const data =
await response.json();

let allowed = false;

for(const nft of data.nft_items){

    const collection =
    nft.collection;

    if(!collection)
        continue;

    const collectionAddress =
    collection.address || "";

    if(
        NFT_COLLECTIONS.includes(
            collectionAddress
        )
    ){
        allowed = true;
        break;
    }

}

return allowed;

}
