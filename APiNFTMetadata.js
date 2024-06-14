import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

export default async (req, res) => {
  const { groupKey, groupValue } = req.query;

  try {
    const umi = createUmi('https://rpc.helius.xyz').use(dasApi());

    // Fetch Digital Assets by Group using DAS API
    const assets = await umi.rpc.getAssetsByGroup({
      groupKey,
      groupValue
    });

    if (assets.items.length === 0) {
      res.status(404).json({ error: 'No assets found for the specified group.' });
      return;
    }

    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error.message || error);
    res.status(500).json({ error: 'Server Error', details: error.message || error });
  }
};
