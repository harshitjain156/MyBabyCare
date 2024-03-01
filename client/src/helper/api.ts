export const authToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhNGM2M2NhMy01MjhlLTQzNWUtODc3MC04ZTBlY2UxNmMxMWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwODY4MjEyOCwiZXhwIjoxNzA5Mjg2OTI4fQ.yrg3JmO33fJOE6VNnS7RyqJKFqX1MRGpc4D8glaunMc";

interface MeetingResponse {
  meetingId: string;
}

// API call to create meeting
export const createMeeting = async ({ token }: { token?: string } = {}) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token || authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  console.log(res);

  const { meetingId } = await res.json();
  return meetingId;
};

interface HlsResponse {
  downstreamUrl: string;
}

// API call to fetch latest downstream url for a meeting session
export const fetchHlsDownstreamUrl = async ({ meetingId }: { meetingId: string }): Promise<string> => {
  try {
    const res = await fetch(
      `https://api.videosdk.live/v2/hls/?roomId=${meetingId}`,
      {
        method: "GET",
        headers: {
          authorization: `${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();
    const { downstreamUrl }: { downstreamUrl: string } = json?.data[0];
    console.log(downstreamUrl);
    return downstreamUrl;
  } catch (err) {
    console.error("Error in Fetching HLS Url: ", err);
    throw err;
  }
};
