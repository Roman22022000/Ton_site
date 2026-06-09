async function checkNFT(address){

try{

status.innerHTML =
"Проверка NFT...";

const response =
await fetch(
`https://tonapi.io/v2/accounts/${address}/nfts?limit=1000`
);

const data =
await response.json();

console.log(
"NFT DATA:",
data
);

let hasNFT = false;

for(const item of (data.nft_items || [])){

    console.log(
        "NFT:",
        item
    );

    const collection =
    item.collection;

    if(!collection)
        continue;

    console.log(
        "COLLECTION:",
        collection
    );

    const collectionAddress =
    collection.address || "";

    if(
        collectionAddress.includes(
            REQUIRED_COLLECTION
        )
    ){

        hasNFT = true;
        break;

    }

}

if(hasNFT){

    unlockCanvas();

}else{

    lockCanvas();

}

}catch(err){

console.error(err);

status.innerHTML =
"Ошибка проверки NFT";

lockCanvas();

}

}

function unlockCanvas(){

canvas.style.display =
"block";

toolbar.style.display =
"flex";

status.innerHTML =
"NFT найден. Рисование разрешено.";

}

function lockCanvas(){

canvas.style.display =
"none";

toolbar.style.display =
"none";

status.innerHTML =
`
Для рисования нужен NFT
<br><br>
<a href="${COLLECTION_LINK}"
target="_blank">
Перейти к коллекции
</a>
`;

}
