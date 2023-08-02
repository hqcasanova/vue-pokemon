import { useStorage } from '@vueuse/core';

const storedLikes = useStorage<string[]>('likes', []);

type UseLikes = {
  isLiked: (id: string) => boolean;
  saveLiked: (id: string) => void;
};

export default function (): UseLikes {
  const isLiked = (id: string) => {
    return storedLikes.value.indexOf(id) !== -1;
  };

  const saveLiked = (id: string) => {
    const likeIndex = storedLikes.value.indexOf(id);

    if (likeIndex === -1) {
      storedLikes.value.push(id);
    } else {
      storedLikes.value.splice(likeIndex, 1);
    }
  };

  return {
    isLiked,
    saveLiked,
  };
}
