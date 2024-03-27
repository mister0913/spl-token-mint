const { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } = require('@metaplex-foundation/umi');
const { TokenStandard, createAndMint } = require('@metaplex-foundation/mpl-token-metadata');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { mplCandyMachine } = require("@metaplex-foundation/mpl-candy-machine");

const secret = require('./guideSecret.json');

const umi = createUmi('https://solana-mainnet.g.alchemy.com/v2/Rl-k1kbMe2tuEwygCCLQGLWspQAobPcn'); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

const metadata = {
    "name": "UCRO",
    "symbol": "$UCRO",
    "description": "",
    "image": "https://ipfs.io/ipfs/QmXXPGUMJiDHSUh55KZWkFVL7aw7ZYi33rpj1hGt6EMxdk"
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 10000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
}).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 10 million tokens (", mint.publicKey, ")");
});
