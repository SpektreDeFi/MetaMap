document.getElementById('nftForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const groupKey = 'collection';
  const groupValue = document.getElementById('groupValue').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Fetching assets...';

  try {
    const response = await fetch(`/api/nftMetadata?groupKey=${groupKey}&groupValue=${groupValue}`);
    console.log('Network response status:', response.status); // Log status
    if (!response.ok) {
      const errorText = await response.text(); // Get error text for more details
      throw new Error(`Network response was not ok: ${errorText}`);
    }
    const assets = await response.json();
    resultsDiv.innerHTML = JSON.stringify(assets, null, 2);
  } catch (error) {
    resultsDiv.innerHTML = 'Error fetching assets: ' + error.message;
  }
});
