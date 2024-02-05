const searchLocation = async (event) => {
  event.preventDefault();
  console.log('where am i?');
  const locationValue = document.getElementById('location_input').value.trim();
  console.log(locationValue);
  if (!locationValue) {
    return;
  }

  try {
    const response = await fetch(`/jobs/location/${locationValue}`, {
      method: 'GET',
    });
    console.log(response);
    if (response.ok) {
      const jobs = await response;
      console.log(jobs);
    } else {
      console.error('Failed to fetch jobs:', response.statusText);
    }
  } catch (err) {
    console.error('Error:', err);
  }
  // location.reload();
};

const searchLoc = document.getElementById('search_menu');
searchLoc.addEventListener('submit', searchLocation);
