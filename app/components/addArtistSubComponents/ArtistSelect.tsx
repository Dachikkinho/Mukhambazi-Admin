import { Select } from '@/app/components/Select/Select';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ArtistSelect = ({ onChange }: Props) => (
    <Select onChange={onChange}>
        <option selected value="/addArtist">
            Add New Artist
        </option>
        <option value="/addAlbum">Add New Album</option>
        <option value="/addMusic">Add New Music</option>
        <option value="/UserManagement">User Menu</option>
        <option value="/editPlaylists">Edit Playlists</option>
    </Select>
);
