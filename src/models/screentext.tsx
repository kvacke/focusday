import ApiFetch from '../components/apifetch';
import { Options } from '../interface/api';

export function getLatest(): Promise<any> {
  const options: Options = {
    url: `api/information/latest`,
    method: 'GET',
  };

  return ApiFetch(options);
}
