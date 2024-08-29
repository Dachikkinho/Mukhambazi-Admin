import { Select } from '@/app/components/Select/Select';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ArtistSelect = ({ onChange }: Props) => (
    <Select onChange={onChange}>
        <option selected value="/addArtist">
            Add New Artist
        </option>
        <option value="/addAlbum">Album</option>
        <option value="/addMusic">Musics</option>
    </Select>
);
