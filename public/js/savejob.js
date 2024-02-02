const saveJob = async (event) => {
  event.preventDefault();
  console.log('save job button pressed');

  const button = event.target;
  const job_id = button.getAttribute('data-job-id');

  if (job_id) {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ job_id }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
      console.log('Job saved successfully');
    } else {
      console.error('Failed to save job');
    }
  }
};

const allCards = document.querySelectorAll('.job_card_button');
allCards.forEach((card) => {
  card.addEventListener('click', saveJob);
});
