document.getElementById('nftForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const groupKey = 'collection';
  const groupValue = document.getElementById('groupValue').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Fetching assets...';

  console.log(`Form submitted with groupKey: ${groupKey}, groupValue: ${groupValue}`);

  try {
    const response = await fetch(`/api/nftMetadata?groupKey=${groupKey}&groupValue=${groupValue}`);
    const data = await response.json();

    console.log('Response from API:', data);

    if (response.ok) {
      resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } else {
      resultsDiv.innerHTML = `Error: ${data.error || 'Unknown error'}`;
    }
  } catch (error) {
    console.error('Error fetching assets:', error.message);
    resultsDiv.innerHTML = `Error fetching assets: ${error.message}`;
  }
});
