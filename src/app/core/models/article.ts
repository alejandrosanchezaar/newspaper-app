export interface Article {
    id: number;
    id_user: number;
    abstract: string;
    subtitle: string;
    update_date: string;
    category: string;
    title: string;
    thumbnail_image?: string; // Optional field for list view
    thumbnail_media_type?: string; // Optional field for list view
    image_data?: string; // Optional field for detailed view
    image_media_type?: string; // Optional field for detailed view
}