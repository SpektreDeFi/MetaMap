const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { walletAddress } = req.query;
  
  try {
    const response = await fetch(`https://api.solscan.io/account?address=${walletAddress}`);
    const data = await response.json();
    
    if (!data.success) {
      return res.status(400).json({ error: 'Failed to fetch data' });
    }

    const tokenData = data.data.tokenBalances.filter(token => token.tokenAmount.uiAmount > 0);
    const metadataPromises = tokenData.map(async token => {
      const metadataResponse = await fetch(token.mint);
      return metadataResponse.json();
    });

    const metadata = await Promise.all(metadataPromises);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
