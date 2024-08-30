'use client';

import { Select } from '@/app/components/Select/Select';

type Props = {
    register: any;
    value: string;
    message: string;
    children: React.ReactNode;
};

export const MusicSelect = ({ register, value, message, children }: Props) => (
    <Select {...register(value, { required: message })}>{children}</Select>
);
