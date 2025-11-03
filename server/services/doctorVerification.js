const { fetchNMCRegistry, fetchABDMRegistry } = require('../utils/registryApis');

// Main AI-like logic for doctor data verification
async function verifyDoctorDetails(details) {
  // Fetch registry data from official sources
  const nmcData = await fetchNMCRegistry(details.registrationNumber);
  const abdmData = await fetchABDMRegistry(details.registrationNumber);

  // Initialize scoring system and reasoning log
  let score = 100;
  let reasons = [];

  // Registry presence check
  if (!nmcData && !abdmData) {
    score -= 50;
    reasons.push('Not found in official registries.');
  }

  // Experience vs registration year logic
  if (nmcData) {
    const regYear = parseInt(nmcData.registrationYear, 10);
    const claimedStartYear = (new Date()).getFullYear() - details.experience;
    if (claimedStartYear < regYear) {
      score -= 25;
      reasons.push('Claimed experience inconsistent with registration year.');
    }
  }

  // Specialization match check
  if (nmcData && nmcData.specialization && details.specialization &&
      nmcData.specialization.toLowerCase() !== details.specialization.toLowerCase()) {
    score -= 10;
    reasons.push('Specialization does not match registry.');
  }

  // Duplicate registration number logic (stub)
  if (Array.isArray(nmcData) && nmcData.length > 1) {
    score -= 30;
    reasons.push('Duplicate registration numbers found.');
  }

  // Extension point: Use OCR, ML or heuristics for uploaded docs here

  // Compose and classify result
  let status = 'Verified';
  if (score < 70) status = 'Review';
  if (score < 30) status = 'Unverified';

  return {
    status,
    score,
    explanation: reasons.length ? reasons.join(' ') : 'Details validated against registry sources.',
    registry: {
      nmc: nmcData,
      abdm: abdmData
    }
  };
}

module.exports = { verifyDoctorDetails };