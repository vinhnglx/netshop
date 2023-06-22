import axios from 'axios';
import {Profanity, ProfanityOptions} from '@2toad/profanity';

export const BASE_API_URL = 'http://localhost:3000';
export const BASE_API_URL_ANDROID = 'http://10.0.2.2:3000';
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const createProfanityFilter = () => {
  const options = new ProfanityOptions();
  options.wholeWord = false;
  const profanity = new Profanity(options);
  profanity.addWords(['b00b', 'wh0re', 'wh0r3', 'whor3', 'a55h01e']); // TODO: Add more words

  return profanity;
};
