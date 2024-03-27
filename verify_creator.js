const { verifyCreatorV1 } =  require("@metaplex-foundation/mpl-token-metadata");
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");

const umi = createUmi(
  "https://solana-mainnet.g.alchemy.com/v2/Rl-k1kbMe2tuEwygCCLQGLWspQAobPcn"
);

const creator = "uv57uhetQetMPYFK2xZRhSX9hdFFhWLkyvxPBhHVdqM";

const metadata = {
  name: "UCRO",
  symbol: "$UCRO",
  description: "UnicronLabs innovative Blockchain AI Tech development",
  image: "https://arweave.net/n0XH03qoNSkjKSclfZN-G9LWedMIi66N0z71jysV0oQ",
};

const CreatorVerification = async function () {
   await verifyCreatorV1(umi, {
     metadata,
     authority: creator,
   }).sendAndConfirm(umi);
}
 
CreatorVerification();