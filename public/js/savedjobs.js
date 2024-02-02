const applyJobs = async () => {
  const response = await fetch('/profile/homeprofile', {
    method: 'GET',
  });

  if (response.ok) {
    const savedJobs = await response.json();
    console.log('Got the jobs');
    console.log(savedJobs);
    savedJobs.forEach((jobId) => {
      const foundBtn = document.querySelector(`[data-job-id="${jobId}"]`);
      console.log(foundBtn);
      if (foundBtn) {
        foundBtn.classList.add('bg-red-600');
      }
    });
  }
};

applyJobs();
