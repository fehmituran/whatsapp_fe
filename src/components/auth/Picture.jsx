import { useRef, useState } from "react";

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
  const inputRef = useRef();

  const [error, setError] = useState(null);

  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp" &&
      pic.type !== "image/gif"
    ) {
      setError(`${pic.name} format is not supported.`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed.`);
      return;
    } else {
      setError("");
      setPicture(pic);
      //reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };

  const removePicture = () => {
    setPicture(null);
    setReadablePicture(null);
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1 ">
      <label htmlFor="" className="text-sm font-bold tracking-wide ">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* change picture */}
          <div
            className="mt-2 w-20 dark:bg-dark_bg_3 rounded-md text-sm font-bold flex items-center justify-center cursor-pointer"
            onClick={() => removePicture()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        ref={inputRef}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => handlePicture(e)}
      />
      {/* error */}
      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
    </div>
  );
};

export default Picture;
