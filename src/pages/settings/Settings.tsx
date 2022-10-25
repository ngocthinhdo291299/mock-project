import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { TOKEN } from "../../constants";
import { getLocal } from "../../helpers";
import convertToken from "../../helpers/convertToken";
import {
  selectCurrentUser,
  selectIsUpdatedUserSucceeded,
  selectLoadingUser,
} from "../../redux/selector/userSelector";
import {
  FETCH_CURRENT_USER_REQUESTED,
  SET_IS_UPDATED_USER_SUCCEEDED,
  UPDATE_USER_REQUESTED,
} from "../../redux/slice/userSlice";
import { settingsInputDataType } from "../../types/settingsType";
import "../../sass/css/form.css";
import FormSkeleton from "../../skeleton/FormSkeleton";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const updatedUser = useSelector(selectIsUpdatedUserSucceeded);
  const loadingUser = useSelector(selectLoadingUser);

  const initialValues: settingsInputDataType = {
    image: currentUser?.image,
    bio: currentUser?.bio,
    username: currentUser?.username,
    email: currentUser?.email,
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: settingsInputDataType) => {
      dispatch(UPDATE_USER_REQUESTED({ user: values }));
    },
  });

  useEffect(() => {
    dispatch(FETCH_CURRENT_USER_REQUESTED());
  }, []);

  useEffect(() => {
    if (updatedUser) {
      dispatch(SET_IS_UPDATED_USER_SUCCEEDED(false));
      navigate(`/${convertToken(getLocal(TOKEN)).username}`);
    }
  }, [updatedUser]);

  if (!currentUser) {
    return <FormSkeleton title="Update Your Profile" />;
  }

  return (
    <div className="my-form transparent-form">
      {loadingUser && <Loading />}
      <div className="container mt-20">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl">Update Your Profile</h1>
          <input
            defaultValue={currentUser.image}
            type="text"
            placeholder="URL of profile picture"
            name="image"
            onChange={formik.handleChange}
          />
          <textarea
            defaultValue={currentUser.bio}
            placeholder="Bio"
            name="bio"
            rows={8}
            onChange={formik.handleChange}
          />
          <input
            defaultValue={currentUser.username}
            type="text"
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
          />
          <input
            type="password"
            placeholder="New Password"
            name="password"
            onChange={formik.handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
