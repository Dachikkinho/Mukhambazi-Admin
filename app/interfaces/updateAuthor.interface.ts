export interface UpdateAuthor {
    firstName: string;
    lastName: string;
    biography: string;
    image?: FileList;
    country: string;
    Category: 'Charts' | 'Hits' | 'Artists';
    Region: 'Popular' | 'Georgian' | 'European';
}
