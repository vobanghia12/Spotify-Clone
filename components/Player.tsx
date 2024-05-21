'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  //! used for undefined
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className='fixed bottom-0 bg-black w-full py-2 h-[80x] px-4'>
      Player!
    </div>
  );
};

export default Player;
