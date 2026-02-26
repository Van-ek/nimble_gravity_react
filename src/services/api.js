const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateInfo = async (email) => {
  const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
  if (!response.ok) throw new Error('Failed retrieving candidate data');
  return response.json();
};

export const getJobsList = async () => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
  if (!response.ok) throw new Error('Failed to load positions list');
  return response.json();
};

export const applyToJob = async (payload) => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Application submitted failed');
  return response.json();
};