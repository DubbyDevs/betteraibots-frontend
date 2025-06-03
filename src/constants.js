export const CATEGORY_SLUGS = {
  "Health & Wellness": "wellness",
  "Creative Tools": "creative",
  "Specialized Knowledge": "wizardry",
  "Productivity": "productivity",
  "Education": "education",
  "Lifestyle": "lifestyle",
  "Music": "music"
};

export const CATEGORY_REVERSE = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([name, slug]) => [slug, name])
);
