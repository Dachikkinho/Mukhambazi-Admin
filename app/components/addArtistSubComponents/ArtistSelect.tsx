import { Select } from '@/app/components/Select/Select';

export const ArtistSelect = ({ onChange }) => (
    <Select onChange={onChange}>
        <option selected value="/addArtist">
            Add New Artist
        </option>
        <option value="/addAlbum">Album</option>
        <option value="/addMusic">Musics</option>
    </Select>
);
