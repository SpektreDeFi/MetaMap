const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { dasApi } = require('@metaplex-foundation/digital-asset-standard-api');
const { PublicKey } = require('@solana/web3.js');

module.exports = async (req, res) => {
  const { tokenAddress } = req.query;

  try {
    // Initialize Umi with DAS API
    const umi = createUmi('https://api.metaplex.com/das-api').use(dasApi());
    const assetId = new PublicKey(tokenAddress);

    // Fetch Digital Asset by Mint
    const asset = await umi.rpc.getAsset(assetId);
    
    // Log to verify the fetched data
    console.log('Fetched metadata account:', asset);

    res.json(asset);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
