import React, { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting, fetchHlsDownstreamUrl } from "../helper/api";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

function JoinScreen({ getMeetingAndToken }: { getMeetingAndToken: (id: string | null) => Promise<void> }) {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center mt-8">
      <input
        type="text"
        placeholder="Enter Meeting Id"
        className="mx-4 w-full  md:w-1/4"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <div className="flex justify-evenly flex-wrap items-center">
        <button onClick={onClick}
          className="border bg-secondary  py-2 px-4 m-1 rounded-full text-white text-sm shadow-sm text-center hover:bg-secondary-dark"
        >
          Join
        </button>
        <button onClick={onClick}
          className="border bg-secondary  py-2 px-4 m-1 rounded-full text-white text-sm shadow-sm text-center hover:bg-secondary-dark"
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
}

function HLSJoinScreen({ onDownstreamUrl }: { onDownstreamUrl: (downstreamUrl: string) => void }) {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const handleOnClick = async (meetingId: string | null) => {
    try {
      if (meetingId) {
        const downstreamUrl = await fetchHlsDownstreamUrl({ meetingId });
        onDownstreamUrl(downstreamUrl);
      }
    } catch (error) {
      console.error("Error fetching downstream URL:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleOnClick(meetingId);
        }}
      >
        Join
      </button>
    </div>
  );
}

function VideoComponent(props: { participantId: string }) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn } = useParticipant(props.participantId);

  

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
    return null;
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId} className="m-4 ">
      {micOn && micRef && <audio ref={micRef} autoPlay />}
      <div className="relative">
        {!videoStream && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden flex items-center text-slate-300 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-24 h-24"
            >
              <path d="M.97 3.97a.75.75 0 0 1 1.06 0l15 15a.75.75 0 1 1-1.06 1.06l-15-15a.75.75 0 0 1 0-1.06ZM17.25 16.06l2.69 2.69c.944.945 2.56.276 2.56-1.06V6.31c0-1.336-1.616-2.005-2.56-1.06l-2.69 2.69v8.12ZM15.75 7.5v8.068L4.682 4.5h8.068a3 3 0 0 1 3 3ZM1.5 16.5V7.682l11.773 11.773c-.17.03-.345.045-.523.045H4.5a3 3 0 0 1-3-3Z" />
            </svg>
          </div>
        )}
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          url={videoStream || ""}
          className="bg-slate-200 w-full border-2 rounded-md overflow-hidden"
          // width={"100px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
          fullscreen
        />
      </div>
    </div>
  );
}


interface ControlsProps {
  // Define any props here if needed
}

export const Controls: React.FC<ControlsProps> = () => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const handleLeaveClick: MouseEventHandler<HTMLButtonElement> = () => {
    leave();
  };

  const handleToggleMicClick: MouseEventHandler<HTMLButtonElement> = () => {
    toggleMic();
  };

  const handleToggleWebcamClick: MouseEventHandler<HTMLButtonElement> = () => {
    toggleWebcam();
  };

  return (
    <div className="mx-auto flex justify-center items-center gap-2">
      <button
        onClick={handleLeaveClick}
        className="border bg-secondary w-auto py-2 px-4 rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-secondary-dark"
      >
        Leave
      </button>
      <button
        onClick={handleToggleMicClick}
        className="border bg-secondary w-auto py-2 px-4 rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-secondary-dark"
      >
        Toggle Mic
      </button>
      <button
        onClick={handleToggleWebcamClick}
        className="border bg-secondary w-auto py-2 px-4 rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-secondary-dark"
      >
        Toggle Webcam
      </button>
    </div>
  );
};




interface ContainerProps {
  meetingId: string;
}

// export const Container: React.FC<ContainerProps> = ({ meetingId }) => {
//   const { participants, join, startHls } = useMeeting({
//     onMeetingJoined: () => {
//       startHls();
//     },
//     onHlsStarted: (downstreamUrl) => {},
//   });

//   const isMeetingJoined = participants.size > 0; // Check if there are participants in the meeting

//   useEffect(() => {
//     if (isMeetingJoined) {
//       startHls();
//     }
//   }, [isMeetingJoined, startHls]);

//   return (
//     <div className="container mx-auto flex-col justify-center items-center mt-8">
//       <div className="border w-full md:w-1/4 bg-primary py-2 px-4 mt-2 mx-auto rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-primary-dark">
//         Meeting Id: {meetingId}
//       </div>
//       {isMeetingJoined ? (
//         <div className="flex flex-col justify-center items-start h-auto w-full">
//           <div className="flex flex-wrap justify-evenly items-start h-auto w-full my-4 mx-2">
//             {[...participants.keys()].map((participantId) => (
//               <VideoComponent key={participantId} participantId={participantId} />
//             ))}
//           </div>
//           <Controls />
//         </div>
//       ) : (
//         <div
//           onClick={join}
//           className="border w-full md:w-1/4 bg-secondary py-2 px-4 mt-2 mx-auto rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-secondary-dark"
//         >
//           Join
//         </div>
//       )}
//     </div>
//   );
// };

export const Container: React.FC<ContainerProps> = ({ meetingId }) => {
  const { participants, join, startHls } = useMeeting({
    onMeetingJoined: () => {
      startHls();
    },
    onHlsStarted: (downstreamUrl) => {},
  });

  const isMeetingJoined = participants.size > 0;

  useEffect(() => {
    if (isMeetingJoined) {
      startHls();
    }
  }, [isMeetingJoined, startHls]);

  // Function to find the host participant
  const findHostParticipant = (): string | null => {
    for (const [participantId, participant] of participants.entries()) {
      if (participant.id) {
        return participantId;
      }
    }
    return null;
  };

  const hostParticipantId = findHostParticipant();

  return (
    <div className="container mx-auto flex-col justify-center items-center mt-8">
      <div className="border w-full md:w-1/4 bg-primary py-2 px-4 mt-2 mx-auto rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-primary-dark">
        Meeting Id: {meetingId}
      </div>
      {isMeetingJoined ? (
        <div className="relative">
          <div className="flex flex-wrap justify-evenly items-start h-auto w-full my-4 mx-2">
            {[...participants.keys()].map((participantId) => (
              <VideoComponent key={participantId} participantId={participantId} />
            ))}
          </div>
        
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Controls />
          </div>
        </div>
      ) : (
        <div
          onClick={join}
          className="border w-full md:w-1/4 bg-secondary py-2 px-4 mt-2 mx-auto rounded-full text-white text-sm shadow-sm text-center cursor-pointer hover:bg-secondary-dark"
        >
          Join
        </div>
      )}
    </div>
  );
};



function MeetingContainer() {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = async (id: string | null) => {
    try {
      const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
      setMeetingId(meetingId);
    } catch (error) {
      console.error("Error getting meeting and token:", error);
    }
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Gaurav",
      }}
      token={authToken}
    >
      <Container meetingId={meetingId} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

function VideoCall() {
  useEffect(() => {
    try {
      fetchHlsDownstreamUrl({ meetingId: "1pji-upzz-v0d4" });
    } catch (error) {
      console.error("Error fetching downstream URL:", error);
    }
  }, []);

  return (
    <div className="mt-24">
      {<MeetingContainer />}
    </div>
  );
}

export default VideoCall;
