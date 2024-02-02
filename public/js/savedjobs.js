const applyJobs = async () => {
  const response = await fetch('/profile/homeprofile', {
    method: 'GET',
  });

  if (response.ok) {
    const savedJobs = await response.json();
    savedJobs.forEach((jobId) => {
      const foundBtn = document.querySelector(`[data-job-id="${jobId}"]`);
      if (foundBtn) {
        foundBtn.classList.add('bg-red-600');
      }
    });
  }
};

applyJobs();
