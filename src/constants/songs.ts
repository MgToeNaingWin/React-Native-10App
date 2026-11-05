
export type Track = {
    id: number;
    title: string;
    artist: string;
    album: string;
    artwork: number;
    url: number;
  };
  
  export const SongsData: Track[] = [
    {
        id: 1,
        title: 'Da World',
        artist: '223',
        album: 'Da World',
        artwork: require('@/assets/223_special.png'),
        url: require('@/assets/songs/DaWorld.mp3'),
    },
    {
        id: 2,
        title: 'Long Way',
        artist: 'Mossberg Arki & Reload',
        album: 'STORY OF A DARK HORSE',
        artwork: require('@/assets/HouseStory.jpeg'),
        url: require('@/assets/songs/LongWay.mp3'),
    },
    {
        id: 3,
        title: "Don't Trap",
        artist: '223',
        album: 'Da World',
        artwork: require('@/assets/223_special.png'),
        url: require('@/assets/songs/DontTrap.mp3'),
    },
    {
        id: 4,
        title: 'Humble',
        artist: 'Kendrick Lamar',
        album: 'DAMN',
        artwork: require('@/assets/Humble.jpeg'),
        url: require('@/assets/songs/HUMBLE.mp3'),
        },
    {
        id: 5,
        title: 'UFO',
        artist: 'Mossberg Arki',
        album: 'STORY OF A DARK HORSE',
        artwork: require('@/assets/HouseStory.jpeg'),
        url: require('@/assets/songs/UFO.mp3'),
    },
  ];
  