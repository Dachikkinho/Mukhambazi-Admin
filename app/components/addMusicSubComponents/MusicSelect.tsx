'use client';

import { Select } from '@/app/components/Select/Select';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const MusicSelect = ({ onChange }: Props) => (
    <Select onChange={onChange}>
        <option value="/addArtist">Add New Artist</option>
        <option value="/addAlbum">Add New Album</option>
        <option selected value="/addMusic">
            Add New Music
        </option>
    </Select>
);
