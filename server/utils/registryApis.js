// Utility stubs for registry API integrations

async function fetchNMCRegistry(registrationNumber) {
  // TODO: Replace stub with actual NMC IMR registry API integration
  // Example: Hit NMC IMR API endpoint and parse doctor data
  if (registrationNumber === 'MOCK123') {
    return {
      registrationYear: '2015',
      specialization: 'Cardiology',
      name: 'Dr. Mock Example'
    };
  }
  return null;
}

async function fetchABDMRegistry(registrationNumber) {
  // TODO: Replace stub with actual ABDM HPR/HFR API integration
  return null; // Implement real check here
}

module.exports = { fetchNMCRegistry, fetchABDMRegistry };