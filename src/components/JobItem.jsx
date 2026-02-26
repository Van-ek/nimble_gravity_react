import { useState } from 'react';

export function JobItem({ job, candidate, onSubmitApplication }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.includes('github.com')) {
      setErrorMsg('Please enter a valid GitHub URL.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await onSubmitApplication({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      
      {status === 'success' ? (
        <div className="success-message">Application successful!</div>
      ) : (
        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="url"
            placeholder="https://github.com/user/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={status === 'loading'}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </button>
        </form>
      )}
      
      {status === 'error' && <p className="error-message">❌ {errorMsg}</p>}
    </div>
  );
}