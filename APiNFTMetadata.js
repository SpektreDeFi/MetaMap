const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { tokenAddress } = req.query;

  try {
    const response = await fetch(`https://api.metaplex.com/v1/nft/${tokenAddress}`);
    const metadata = await response.json();

    if (!response.ok) {
      throw new Error(metadata.error || 'Failed to fetch metadata');
    }

    res.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
