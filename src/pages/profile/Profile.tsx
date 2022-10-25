import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../constants";
import { utilitiesToken } from "../../helpers";
import { useNavigate, useParams, Outlet, NavLink } from "react-router-dom";
import {
  selectLoadingProfileUser,
  selectNewProfileUserAfterToggleFollow,
  selectProfileUser,
} from "../../redux/selector/userSelector";
import {
  FETCH_PROFILE_USER_REQUESTED,
  TOGGLE_FOLLOW_USER_REQUESTED,
} from "../../redux/slice/userSlice";
import { FETCH_ARTICLE_BY_AUTHOR_REQUESTED } from "../../redux/slice/articleSlice";
import ArticleByAuthor from "./ArticleByAuthor";
import ProfileUserSkeleton from "../../skeleton/ProfileUserSkeleton";
import { useScrollToTop } from "../../hooks";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileUser = useSelector(selectProfileUser);
  const loading = useSelector(selectLoadingProfileUser);
  const newProfileUserAfterToggleFollow = useSelector(
    selectNewProfileUserAfterToggleFollow
  );
  const isYourProfile = utilitiesToken.getName() === username;

  const arr = [
    {
      title: "My posts",
      path: "",
    },
    {
      title: "Liked posts",
      path: `/${username}${routes.FAVORITES}`,
    },
  ];

  useScrollToTop();

  useEffect(() => {
    dispatch(FETCH_PROFILE_USER_REQUESTED(username));
  }, [username]);

  useEffect(() => {
    dispatch(FETCH_ARTICLE_BY_AUTHOR_REQUESTED(username));
  }, []);

  function handleFollowOrEdit() {
    if (isYourProfile) {
      navigate(routes.SETTINGS);
      return;
    }
    if (!utilitiesToken.getName()) {
      navigate(routes.LOGIN);
      return;
    }
    dispatch(
      TOGGLE_FOLLOW_USER_REQUESTED(
        newProfileUserAfterToggleFollow || profileUser
      )
    );
  }

  if (loading) {
    return <ProfileUserSkeleton />;
  }

  return (
    <div className="px-8 md:px-20 ">
      <div className="favorited-article relative max-w-[1100px]  m-auto mt-20">
        <div className="w-full h-[250px] md:h-[300px] absolute">
          <img
            className="h-full w-full absolute object-cover"
            src="https://img1.kienthucvui.vn/uploads/2020/08/02/hinh-nen-mau-trang-dep-nhat-full-hd_030746842.jpg"
            alt=""
          />
        </div>
        <div className="flex-col items-center relative z-10 flex top-40 ">
          <div className=" w-[14.75rem] z-40 relative  ">
            <div className="relative">
              <img
                src={profileUser?.image}
                alt=""
                className="object-cover w-full"
              />
              <button
                onClick={handleFollowOrEdit}
                className="py-3 px-10 whitespace-nowrap shadow-lg font-bold absolute top-3/4 left-1/2 translate-x-[-50%] text-[10px] rounded-full bg-white"
              >
                {isYourProfile ? (
                  <>
                    <i className="fa-solid fa-gear"></i> Edit Profile Settings
                  </>
                ) : (
                  ` ${
                    (newProfileUserAfterToggleFollow || profileUser)?.following
                      ? "UNFOLLOW"
                      : "FOLLOW"
                  } ${profileUser?.username.toUpperCase()}`
                )}
              </button>
            </div>
          </div>
          <div className=" z-50 relative top-4 w-full  ">
            <div className="text-center ">
              <h3 className=" text-2xl text-black ">{profileUser?.username}</h3>
              <p>{profileUser?.bio}</p>
            </div>
            <div className=" border-b flex w-full mt-5  gap-x-5">
              {arr.map((item, i) => (
                <NavLink to={item.path} end className="m-0  py-5" key={i}>
                  {item.title}
                </NavLink>
              ))}
            </div>
            <div className="mb-20">
              {window.location.pathname.slice(1) === username && (
                <ArticleByAuthor />
              )}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
