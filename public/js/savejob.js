const saveJob = async (event) => {
  event.preventDefault();
  console.log('save job button pressed');

  const button = event.target;
  console.log(button);
  const job_title = button.getAttribute('data-job-title');
  const job_id = button.getAttribute('data-job-id');
  const company_name = button.getAttribute('data-company-name');
  console.log('hello0');
  console.log([job_title, job_id, company_name]);

  if (job_title && job_id && company_name) {
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
