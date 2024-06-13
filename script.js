document.getElementById('nftForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const tokenAddress = document.getElementById('tokenAddress').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Fetching metadata...';

  try {
    const response = await fetch(`/api/nftMetadata?tokenAddress=${tokenAddress}`);
    const metadata = await response.json();
    resultsDiv.innerHTML = JSON.stringify(metadata, null, 2);
  } catch (error) {
    resultsDiv.innerHTML = 'Error fetching metadata: ' + error.message;
  }
});
