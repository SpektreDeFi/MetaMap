const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { dasApi } = require('@metaplex-foundation/digital-asset-standard-api');

module.exports = async (req, res) => {
  const { groupKey, groupValue } = req.query;

  try {
    const umi = createUmi('https://rpc.helius.xyz').use(dasApi());

    // Fetch Digital Assets by Group using DAS API
    const assets = await umi.rpc.getAssetsByGroup({
      groupKey,
      groupValue
    });

    // Log to verify the fetched data
    console.log('Fetched assets:', assets);

    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error.response?.data || error.message);
    res.status(500).json({ error: 'Server Error', details: error.response?.data || error.message });
  }
};
