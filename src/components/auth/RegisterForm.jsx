import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../../utils/validation";
import AuthInput from "./AuthInput";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice";
import { useState } from "react";
import Picture from "./Picture";
import axios from "axios";

const RegisterForm = () => {
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;
  const cloud_secret = process.env.REACT_APP_CLOUD_API_SECRET;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState();

  const onSubmit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));

    if (picture) {
      //upload picture to cloudinary and then register user
      await uploadImage().then(async (resp) => {
        res = await dispatch(
          registerUser({
            ...data,
            picture: resp.secure_url,
          })
        );
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }

    if (res?.payload?.user) {
      navigate("/");
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", cloud_secret);
    const { data } = await axios.post(
      `http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    console.log("data", data);
    return data;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl ">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font_bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />

          {/* if we have an error */}
          {error ? (
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          ) : null}

          {/*Submit button*/}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
