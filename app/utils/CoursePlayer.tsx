// import React, { FC, useEffect, useState } from 'react'
// import axios from 'axios';
// type Props = {
//     videoUrl: string;
//     title: string;
// }

// const CoursePlayer:FC<Props> = ({videoUrl}) => {

//     const [videoData, setVideoData] = useState({
//         otp:"",
//         playbackInfo: "",
//     });

//     useEffect(()=>{
//       axios.post("http://localhost:8000/api/v1/getVdoCipherOTP",{
//         videoId: videoUrl,
//       }).then((res)=>{
//         setVideoData(res.data);
//       });
//     },[videoUrl]);

//   return (
//     <div style={{paddingTop:"41%", position:"relative"}}>
//         {
//             videoData.otp && videoData.playbackInfo !== "" && (
//                 <iframe
//                  src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=bleuoXlv8ZPsUXTS`}

//                 // src={`https://player.vdocipher.com/v2/?otp=20160313versASE3236UBi3VotCMzbK4CiqFHpPjX6yQQjEg7pRBDsASPYDdO2lw&playbackInfo=eyJ2aWRlb0lkIjoiZjBkZjRlMjAxMjMwYTE1NWUwYWEwOGZhYmEzZTRkNGEifQ==&player=bleuoXlv8ZPsUXTS`}
                
//                 style={{
//                     border:0,
//                     width:"90%",
//                     height:"100%",
//                     position:"absolute",
//                     top:0,
//                     left:0
//                 }}
//                 allowFullScreen={true}
//                 allow='encrypted-media'>

//                 </iframe>
//             )
//         }

//     </div>
//   )
// }
// export default CoursePlayer;

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
      axios.post("http://localhost:8000/api/v1/getVdoCipherOTP", {
          videoId: videoUrl,
      })
      .then((res) => {
          setVideoData(res.data);
      })
      .catch((error) => {
          console.error("Error fetching VdoCipher OTP:", error);
          // Handle the error or set default values for videoData
      });
  }, [videoUrl]);
  

    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=bleuoXlv8ZPsUXTS`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow='encrypted-media'
                    />
                )
            }
        </div>
    );
}

export default CoursePlayer;
