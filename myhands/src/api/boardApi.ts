import fetchApi from './axios';

type BoardPost = {
  boardId: number;
  title: string;
  content: string;
  timeAgo: string;
};

type ResponseBoardData = {
  status: string;
  message: string;
  responseDto: BoardPost[];
};

const getBoardPosts = async (size = 4): Promise<BoardPost[]> => {
  try {
    const {data} = await fetchApi.get<ResponseBoardData>(
      `/board/overview?size=${size}`
    );
    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch board posts');
  } catch (error) {
    console.error('Error fetching board posts:', error);
    throw error;
  }
};

const getBoardPostAll = async (
  size = 15,
  lastId?: number
): Promise<BoardPost[]> => {
  try {
    const url = lastId
      ? `/board/list?size=${size}&lastId=${lastId}`
      : `/board/list?size=${size}`;

    const {data} = await fetchApi.get<ResponseBoardData>(url);

    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch board posts');
  } catch (error) {
    console.error('Error fetching board posts:', error);
    throw error;
  }
};

const getBoardSearchResults = async (
  word: string,
  size = 15,
  lastId?: number
): Promise<BoardPost[]> => {
  try {
    const url = lastId
      ? `/board/search?size=${size}&word=${word}&lastId=${lastId}`
      : `/board/search?size=${size}&word=${word}`;

    const {data} = await fetchApi.get<ResponseBoardData>(url);

    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch search results');
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

type BoardDetailResponse = {
  status: string;
  message: string;
  responseDto: {
    title: string;
    content: string;
    createdAt: string;
  };
};

type BoardDetail = {
  title: string;
  content: string;
  createdAt: string;
};
const getBoardDetail = async (boardId: number): Promise<BoardDetail> => {
  try {
    const {data} = await fetchApi.get<BoardDetailResponse>(
      `/board/detail?boardId=${boardId}`
    );

    if (data.status === 'OK') {
      return data.responseDto;
    }
    throw new Error(data.message || 'Failed to fetch board details');
  } catch (error) {
    console.error('Error fetching board details:', error);
    throw error;
  }
};

export {getBoardPosts, getBoardPostAll, getBoardSearchResults, getBoardDetail};
export type {BoardPost, BoardDetail};
