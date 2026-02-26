import { useState } from 'react';
import { getCandidateInfo, getJobsList, applyToJob } from './services/api';
import { JobItem } from './components/JobItem';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError(null);

    try {
      const candidateData = await getCandidateInfo(email);
      setCandidate(candidateData);

      const jobsData = await getJobsList();
      setJobs(jobsData);
    } catch (err) {
      setGlobalError(err.message || 'Connection error. Verify your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header>
        <h1>Job Application</h1>
      </header>

      {globalError && <div className="error-banner">{globalError}</div>}

      {!candidate ? (
        <form onSubmit={handleStart} className="login-form">
          <label htmlFor="email">Enter your email address to apply:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading data...' : 'Check my data'}
          </button>
        </form>
      ) : (
        <section className="jobs-section">
          <h2>¡Hi, {candidate.firstName}!</h2>
          <p>Choose a position and enter the URL from your repository:</p>
          
          <div className="jobs-list">
            {jobs.map((job) => (
              <JobItem
                key={job.id}
                job={job}
                candidate={candidate}
                onSubmitApplication={applyToJob}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;