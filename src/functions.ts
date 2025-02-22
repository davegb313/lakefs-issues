import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos/treeverse/lakeFS/issues';

export interface Issue {
    id: number;
    number: number;
    title: string;
    body: string;
  }

export const getIssues = async (page: number, perPage: number = 15): Promise<Issue[]> => {
  try {
    const response = await axios.get<Issue[]>(BASE_URL, {
      params: { per_page: perPage, page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    throw new Error("Failed to fetch issues");
  }
}