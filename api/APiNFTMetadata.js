import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

export default async (req, res) => {
  const { groupKey, groupValue } = req.query;

  try {
    const umi = createUmi('https://rpc.helius.xyz').use(dasApi());

    const assets = await umi.rpc.getAssetsByGroup({
      groupKey,
      groupValue
    });

    console.log('Fetched assets:', assets);
    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error.message || error);

    // Log the full response for debugging
    if (error.response) {
      console.error('Response:', error.response);
    }
    
    res.status(500).json({ error: 'Server Error', details: error.message || error });
  }
};
