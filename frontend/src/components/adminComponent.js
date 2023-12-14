import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';
//import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

function AdminPage() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [companies, setCompanies] = useState([]);
  const [acquiringCompany, setAcquiringCompany] = useState('');
  const [acquiredCompany, setAcquiredCompany] = useState('');
  const [useNewName, setUseNewName] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [users, setUsers] = useState([]);
  const [adminAction, setAdminAction] = useState('grant');
  const [grantAdminUser, setGrantAdminUser] = useState('');
  const [address, setAddress] = useState('');
  const [industry, setIndustry] = useState('');
  const [splitCompanies, setSplitCompanies] = useState([]);


  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }

    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:9000/getdata/companies');
        if (response.ok) {
          const data = await response.json();
          setCompanies(data.data.map((company) => company.companyName));
        } else {
          throw new Error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Fetching companies failed: ', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9000/getdata/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Fetching users failed: ', error);
      }
    };

    const fetchSplitCompanies = async () => {
      try {
        const responseCompanies = await fetch('http://localhost:9000/getdata/companies');
        const responseCompaniesSplit = await fetch('http://localhost:9000/getdata/companies/split');

        if (responseCompanies.ok && responseCompaniesSplit.ok) {
          const dataCompanies = await responseCompanies.json();
          const dataCompaniesSplit = await responseCompaniesSplit.json();

          const filteredCompanies = dataCompanies.data.filter(
            (company) => company.hasMerged === 0 && (company.parentCompany === null || company.parentCompany === '')
          );

          const wholeCompanyNames = new Set(dataCompaniesSplit.data.map((companySplit) => companySplit.wholeCompany).filter((name) => name));

          const matchingCompanies = filteredCompanies.filter((company) => wholeCompanyNames.has(company.companyName));

          setSplitCompanies(matchingCompanies.map((company) => company.companyName));
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Fetching and comparing companies failed: ', error);
      }
    };

    fetchCompanies();
    fetchUsers();
    fetchSplitCompanies();
  }, [isAdmin, navigate]);

  const handleNameSelectionChange = (event) => {
    setUseNewName(event.target.value === 'new');
  };

  const handleSubmission = async () => {
    const finalName = useNewName ? newCompanyName : 'retain';
    const url = `http://localhost:9000/modification/merge/${encodeURIComponent(acquiringCompany)}/${encodeURIComponent(acquiredCompany)}/${finalName}`;

    const bodyData = {
      address: address,
      industry: industry,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Merge Successful:', responseData);
        alert('Merge operation was successful.');
      } else {
        console.error('Merge Failed:', response.statusText);
        alert('Merge operation failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error submitting merge:', error);
      alert('Error submitting merge: ' + error.message);
    }
  };

  const handleAdminActionChange = (event) => {
    setAdminAction(event.target.value);
    setGrantAdminUser('');
  };

  const handleGrantAdminSubmission = async () => {
    try {
      if (!grantAdminUser) {
        alert('Please select a user.');
        return;
      }

      const action = adminAction === 'grant' ? 'grant' : 'revoke';
      const response = await fetch(`http://localhost:9000/modification/admin/${action}/${grantAdminUser}`, {
        method: 'POST',
      });

      if (response.ok) {
        alert(`User ${action === 'grant' ? 'promoted' : 'revoked'} as admin successfully`);
        setUsers(users.filter((user) => user.verifiedEmail !== grantAdminUser));
      } else {
        alert(`Failed to ${action === 'grant' ? 'promote' : 'revoke'} user as admin`);
      }
    } catch (error) {
      alert(`Error ${adminAction === 'grant' ? 'promoting' : 'revoking'} user as admin: ${error.message}`);
    }
  };

  const handleSplitSubmission = async () => {
    if (!acquiringCompany) {
      alert('Please select a company to split.');
      return;
    }

    const url = `http://localhost:9000/modification/split/${encodeURIComponent(acquiringCompany)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Split Successful:', responseData);
        alert('Split operation was successful.');
      } else {
        console.error('Split Failed:', response.statusText);
        alert('Split operation failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error submitting split:', error);
      alert('Error submitting split: ' + error.message);
    }
  };


  return (
    <div className="admin-dashboard">
      <div className="card">
        <div className="card-title">MERGE</div>
        <div className="dropdown-container">
          <label className="dropdown-label">Buyer Company:</label>
          <select value={acquiringCompany} onChange={(e) => setAcquiringCompany(e.target.value)}>
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <label className="dropdown-label">Being Bought Company:</label>
          <select value={acquiredCompany} onChange={(e) => setAcquiredCompany(e.target.value)}>
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="name-selection-container">
          <div>
            <input
              type="radio"
              id="useAcquirerName"
              name="nameSelection"
              value="acquirer"
              onChange={handleNameSelectionChange}
              checked={!useNewName}
            />
            <label htmlFor="useAcquirerName">Use Buyer Company's Name</label>
          </div>
          <div>
            <input
              type="radio"
              id="useNewName"
              name="nameSelection"
              value="new"
              onChange={handleNameSelectionChange}
              checked={useNewName}
            />
            <label htmlFor="useNewName">Use a New Name</label>
          </div>
          {useNewName && (
            <input
              type="text"
              placeholder="Enter Name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
          )}
        </div>
        <div className="input-container">
          <label htmlFor="addressInput">Address:</label>
          <input
            type="text"
            id="addressInput"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="industryInput">Industry:</label>
          <input
            type="text"
            id="industryInput"
            placeholder="Enter Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={handleSubmission}>
          Submit
        </button>
      </div>

      <div className="card">
        <div className="card-title">ADMIN</div>
        <div className="dropdown-container">
          <label className="dropdown-label">Select Admin Action:</label>
          <select value={adminAction} onChange={handleAdminActionChange}>
            <option value="grant">Grant Admin</option>
            <option value="revoke">Revoke Admin</option>
          </select>
        </div>
        <div className="dropdown-container">
          <label className="dropdown-label">Select User:</label>
          <select value={grantAdminUser} onChange={(e) => setGrantAdminUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user, index) => (
              <option key={index} value={user.verifiedEmail}>
                {user.verifiedEmail}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-button" onClick={handleGrantAdminSubmission}>
          {adminAction === 'grant' ? 'Grant Admin' : 'Revoke Admin'}
        </button>
      </div>
      {/* SPLIT Card */}
      <div className="card">
        <div className="card-title">SPLIT</div>
        <div className="dropdown-container">
          <label className="dropdown-label">Company to Split:</label>
          <select value={acquiringCompany} onChange={(e) => setAcquiringCompany(e.target.value)}>
            <option value="">Select Company</option>
            {splitCompanies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-button" onClick={handleSplitSubmission}>
          Split
        </button>
        {/* Additional elements for split form if necessary */}
      </div>
    </div>
  )
}


export default AdminPage;
