export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({
      error: "Missing Google Places environment variables",
    });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API error:", data);

      return res.status(response.status).json({
        error: data,
      });
    }

    const result = {
      id: data.id,
      name: data.displayName?.text || "",
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      googleMapsUri: data.googleMapsUri || null,

      reviews: (data.reviews || []).map((review) => ({
        id: review.name,
        author:
          review.authorAttribution?.displayName ||
          "Google user",
        authorPhoto:
          review.authorAttribution?.photoUri || null,
        rating: review.rating || 0,
        text: review.text?.text || "",
        relativeTime:
          review.relativePublishTimeDescription || "",
        googleMapsUri:
          review.googleMapsUri || null,
      })),
    };

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=21600, stale-while-revalidate=3600"
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch Google reviews",
    });
  }
}