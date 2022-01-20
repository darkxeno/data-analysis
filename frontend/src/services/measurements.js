import axios from 'axios'

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL || '';

export async function getMeasurements(limit, start, stop, muid){
  try {

    const { data } = await axios.get(`${backendBaseUrl}/api/measurements`, { params: { start, stop, limit, muid } });
    return data;

  } catch (error){
    console.error('Network error on getMeasurements /', error);
    return error;
  }
}