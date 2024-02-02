const saveJob = async (button, job_id) => {
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

const deleteJob = async (button, job_id) => {
  if (job_id) {
    const response = await fetch('/api/jobs', {
      method: 'DELETE',
      body: JSON.stringify({ job_id }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
      console.log('Job succefully deleted');
    } else {
      console.log('Failed to delete job');
    }
  }
};

const saveStatus = async (event) => {
  event.preventDefault();

  const button = event.target;
  const job_id = button.getAttribute('data-job-id');

  const response = await fetch('/profile/homeprofile', {
    method: 'GET',
  });

  if (response.ok) {
    const savedJobs = await response.json();
    if (savedJobs.includes(job_id)) {
      deleteJob(button, job_id);
    } else {
      saveJob(button, job_id);
    }
  }
  location.reload();
};

const allCards = document.querySelectorAll('.job_card_button');
allCards.forEach((card) => {
  card.addEventListener('click', saveStatus);
});
