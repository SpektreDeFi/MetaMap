const fetch = require('node-fetch');
const { Connection, PublicKey } = require('@solana/web3.js');
const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');

module.exports = async (req, res) => {
  const { tokenAddress } = req.query;

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const mintPublicKey = new PublicKey(tokenAddress);

    // Fetching metadata using Metaplex's Metadata
    const metadataPDA = await Metadata.getPDA(mintPublicKey);
    const metadataAccount = await Metadata.load(connection, metadataPDA);

    res.json(metadataAccount.data);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
