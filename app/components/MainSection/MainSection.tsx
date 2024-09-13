import styles from './MainSection.module.scss';
import CarouselSection from '../CarouselSection/CarouselSection';
import Search from '../Header/Search/Search';
import TopArtist from './TopArtist/TopArtist';

const popularImages = [
    'images/SongCovers/mega.png',
    'images/SongCovers/metalica.png',
    'images/SongCovers/bob.png',
    'images/SongCovers/notarius.png',
    'images/SongCovers/niaz.jpg',
    'images/SongCovers/beatles.png',
    'images/SongCovers/king.jpg',
    'images/SongCovers/roberta.png',
    'images/SongCovers/gogi.jpg',
    'images/SongCovers/jansug.jpg',
    'images/SongCovers/funkadelic.png',
    'images/SongCovers/barry.jpg',
    'images/SongCovers/ray.jpg',
    'images/SongCovers/cyndi.png',
    'images/SongCovers/chakrulos.jpg',
    'images/SongCovers/carole.png',
    'images/SongCovers/bilie.png',
    'images/SongCovers/smash.png',
    'images/SongCovers/missy.png',
    'images/SongCovers/elton.png',
    'images/SongCovers/papas.png',
    'images/SongCovers/loretta.png',
    'images/SongCovers/kendrick.png',
    'images/SongCovers/lady.png',
    'images/SongCovers/madona.png',
    'images/SongCovers/joni.png',
];

const topAlbumImages = [
    'images/SongCovers/thebeatles.jpg',
    'images/SongCovers/nevermind.png',
    'images/SongCovers/blondie.png',
    'images/SongCovers/pink.jpg',
    'images/SongCovers/elvis.png',
    'images/SongCovers/kate.png',
    'images/SongCovers/lemonade.png',
    'images/SongCovers/ariana.png',
    'images/SongCovers/asap.png',
    'images/SongCovers/harris.png',
    'images/SongCovers/nodoubt.png',
    'images/SongCovers/beyonce.png',
    'images/SongCovers/lana.png',
    'images/SongCovers/betty.png',
    'images/SongCovers/kenny.png',
    'images/SongCovers/nirvana.png',
];

const MainSection = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.topContainer}>
                <Search
                    placeholder={'Enter keywords to search'}
                    icon={'search'}
                    width={24}
                    height={24}
                />
            </div>
            <div className={styles.wrapper}>
                <CarouselSection
                    heading="Popular of the week"
                    icon="/icons/popular.png"
                    images={popularImages}
                    interval={4000}
                />
                <CarouselSection
                    heading="Top Albums"
                    icon="/icons/topalbum.png"
                    images={topAlbumImages}
                    interval={4000}
                />
            </div>
            <TopArtist />
        </div>
    );
};

export default MainSection;
