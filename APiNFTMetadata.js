const { Connection, PublicKey } = require('@solana/web3.js');
const { fetchDigitalAsset } = require('@metaplex-foundation/mpl-token-metadata');

module.exports = async (req, res) => {
  const { tokenAddress } = req.query;

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const mintPublicKey = new PublicKey(tokenAddress);

    // Fetch Digital Asset by Mint
    const asset = await fetchDigitalAsset(connection, mintPublicKey);

    // Log the response to check if it is valid JSON
    console.log('Fetched asset:', asset);

    res.json(asset);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
