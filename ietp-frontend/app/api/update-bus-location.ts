import type { NextApiRequest, NextApiResponse } from "next";

type LocationData = {
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  accuracy: number;
  timestamp: string;
};

type RequestData = {
  busId: string;
  locationData: LocationData;
};

type ResponseData = {
  message: string;
  data?: LocationData;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
      error: "Only POST requests are allowed",
    });
  }

  try {
    const { busId, locationData } = req.body as RequestData;

    // Validate required fields
    if (!busId || !locationData) {
      return res.status(400).json({
        message: "Bad Request",
        error: "Missing required fields: busId or locationData",
      });
    }

    // Validate location data
    if (
      typeof locationData.latitude !== "number" ||
      typeof locationData.longitude !== "number" ||
      typeof locationData.accuracy !== "number"
    ) {
      return res.status(400).json({
        message: "Bad Request",
        error: "Invalid location data format",
      });
    }

    // Log the received data (for debugging)
    console.log("Received location update:", {
      busId,
      locationData,
    });

    // Here you would typically:
    // 1. Save the location data to your database
    // 2. Update real-time subscriptions if needed
    // For now, we'll just return success

    return res.status(200).json({
      message: "Location updated successfully",
      data: locationData,
    });
  } catch (error) {
    console.error("Error processing location update:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}

// Enable CORS if needed
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};
