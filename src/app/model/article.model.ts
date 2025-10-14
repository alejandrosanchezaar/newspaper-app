// Note: An 'interface' is a perfect choice here. It defines the "shape"
// of our article object without adding extra weight to our app.

export interface Article {
  // The unique identifier for the article. It's optional ('?')
  // because a new article won't have an ID until it's saved.
  id?: string;

  // Mandatory fields as per your requirements
  title: string;
  category: string;
  abstract: string;

  // Optional fields
  subtitle?: string;
  body?: string;

  // Field returned by the server
  update_date?: string; // e.g., "2025-10-14T18:30:00Z"

  // Fields for a single, detailed article view
  image_data?: string;       // The full-size image as a Base64 string
  image_media_type?: string; // e.g., "image/jpeg"

  // Fields for a list of articles (previews)
  thumbnail_data?: string;       // The smaller image as a Base64 string
  thumbnail_media_type?: string; // e.g., "image/jpeg"
}