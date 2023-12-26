// import React, { useRef, useState } from "react";

// const Picture = ({ readablePicture, setPicture, setReadablePicture }) => {
//   const [error, setError] = useState();
//   const inputRef = useRef();
//   const handlePicture = (e) => {
//     let pic = e.target.files[0];
//     if (
//       pic.type !== "image/jpeg" &&
//       pic.type !== "image/png" &&
//       pic.type !== "image/webp" &&
//       pic.type !== "image/jpg"
//     ) {
//       setError(`${pic.name} format is not supported.`);
//       return;
//     } else if (pic.size > 1024 * 1024 * 5) {
//       //5mb
//       setError(`${pic.name} is too large, maximum 5mb allowed`);
//       return;
//     } else {
//       setError("");
//       setPicture(pic);
//       //reading the picture
//       const reader = new FileReader();
//       reader.readAsDataURL(pic);
//       reader.onload = (e) => {
//         setReadablePicture(e.target.result);
//       };
//     }
//   };
//   const handleRemovePic = (e) => {
//     setPicture("");
//     setReadablePicture("");
//   };
//   return (
//     <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
//       <label htmlFor="picture" className="text-sm font-bold tracking-wide">
//         Picture (optional)
//       </label>
//       {readablePicture ? (
//         <div>
//           <img
//             src={readablePicture}
//             alt="ProfilePicture"
//             className="w-20 h-20 object-cover rounded-full"
//           />
//           {/* remove picture */}
//           <div
//             className="mt-2 w-20 py-1 dark: bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
//             onClick={() => handleRemovePic()}
//           >
//             remove
//           </div>
//         </div>
//       ) : (
//         <div
//           className="w-full h-12 dark: bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
//           onClick={() => inputRef.current.click()}
//         >
//           Upload Picture
//         </div>
//       )}
//       <input
//         type="file"
//         name="picture"
//         id="picture"
//         hidden
//         ref={inputRef}
//         accept="image/png, image/jpeg, image/jpg, image/webp"
//         onChange={handlePicture}
//       />
//       {/* error */}
//       <div className="mt-2">
//         <p className="text-red-400">{error}</p>
//       </div>
//     </div>
//   );
// };

// export default Picture;

import React, { useRef, useState } from "react";
import { Button, Typography } from "@mui/material";

const Picture = ({ readablePicture, setPicture, setReadablePicture }) => {
  const [error, setError] = useState();
  const inputRef = useRef();

  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp" &&
      pic.type !== "image/jpg"
    ) {
      setError(`${pic.name} format is not supported.`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed`);
      return;
    } else {
      setError("");
      setPicture(pic);

      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };

  const handleRemovePic = (e) => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div style={{ marginTop: "32px", display: "flex", flexDirection: "column" }}>
      <label
        htmlFor="picture"
        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}
      >
        Picture (optional)
      </label>
      {readablePicture ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={readablePicture}
            alt="ProfilePicture"
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
          />
          <Button
            variant="contained"
            size="small"
            style={{
              marginTop: "8px",
              width: "80px",
              padding: "4px",
              backgroundColor: "#333",
              color: "#fff",
            }}
            onClick={handleRemovePic}
          >
            remove
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          size="large"
          style={{ width: "100%", height: "48px", borderRadius: "4px" }}
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
        </Button>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handlePicture}
      />
      <Typography variant="body2" style={{ color: "#f44336", marginTop: "8px" }}>
        {error}
      </Typography>
    </div>
  );
};

export default Picture;
