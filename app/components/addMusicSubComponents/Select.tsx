'use client';

import { Select } from '@/app/components/Select/Select';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    register: UseFormRegister<any>;
    value: string;
    message: string;
    children: React.ReactNode;
};

export const MusicSelect = ({ register, value, message, children }: Props) => (
    <Select {...register(value, { required: message })}>{children}</Select>
);
