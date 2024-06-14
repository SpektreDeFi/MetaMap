document.getElementById('nftForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const groupKey = 'collection';
  const groupValue = document.getElementById('groupValue').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Fetching assets...';

  try {
    const response = await fetch(`/api/nftMetadata?groupKey=${groupKey}&groupValue=${groupValue}`);
    
    if (response.ok) {
      const data = await response.json();
      resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } else {
      const errorText = await response.text();
      resultsDiv.innerHTML = `Error: ${errorText}`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `Error fetching assets: ${error.message}`;
  }
});
