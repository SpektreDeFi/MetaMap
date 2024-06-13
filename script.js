document.getElementById('nftForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const walletAddress = document.getElementById('walletAddress').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Fetching metadata...';

  try {
    const response = await fetch(`/api/nftMetadata/${walletAddress}`);
    const metadata = await response.json();
    resultsDiv.innerHTML = JSON.stringify(metadata, null, 2);
  } catch (error) {
    resultsDiv.innerHTML = 'Error fetching metadata: ' + error.message;
  }
});
