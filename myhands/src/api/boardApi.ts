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

export {getBoardPosts};
export type {BoardPost};
