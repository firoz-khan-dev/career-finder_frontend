import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function Applications() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get(`/application/job/${jobId}`)
      .then(res => setApps(res.data));
  }, []);

  return (
    <div>
      <h2>Applications</h2>
      {apps.map(app => (
        <div key={app._id}>
          <p>{app.userId.name}</p>
          <a href={`${import.meta.env.VITE_API_BASE_URL}/${app.userId.resume?.url}`} target="_blank">
            View Resume
          </a>
        </div>
      ))}
    </div>
  );
}