'use client';

import { Select } from '@/app/components/Select/Select';
import { useRouter } from 'next/navigation';

export const PlaylistSelect = () => {
    const router = useRouter();
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <Select onChange={onChange}>
            <option value="/addArtist">Add New Artist</option>
            <option value="/addAlbum">Add New Album</option>
            <option value="/addMusic">Add New Music</option>
            <option value="/UserManagement">User Menu</option>
            <option selected value="/editPlaylists">
                Edit Playlists
            </option>
        </Select>
    );
};
