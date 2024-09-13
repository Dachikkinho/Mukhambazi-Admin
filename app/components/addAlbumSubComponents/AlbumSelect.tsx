import { Select } from '../Select/Select';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const AlbumSelect = ({ onChange }: Props) => (
    <Select onChange={onChange}>
        <option value="/addArtist">Add New Artist</option>
        <option selected value="/addAlbum">
            Add New Album
        </option>
        <option value="/addMusic">Add New Music</option>
        <option value="/UserManagement">User Menu</option>
        <option value="/editPlaylists">Edit Playlists</option>
    </Select>
);
