import axios, { AxiosResponse} from 'axios';

const fetcher = (url: string) =>
    axios.get(url).then((res: AxiosResponse) => res.data);

export default fetcher;