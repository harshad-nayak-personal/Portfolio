export const fetchHoldingsData = async () => {
  try {
    const response = await fetch('https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
