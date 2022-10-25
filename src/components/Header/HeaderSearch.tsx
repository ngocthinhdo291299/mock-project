import moment from "moment";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import convertText from "../../helpers/convertText";
import { useClickOutside } from "../../hooks";
import { selectArticleForSeaching } from "../../redux/selector";
import { articleType } from "../../types";

interface HeaderSearchProps {}

const HeaderSearch: React.FC<HeaderSearchProps> = () => {
  const [searchedArticles, setSearchedArticles] = useState<articleType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const articles = useSelector(selectArticleForSeaching);

  useClickOutside(searchBoxRef, () => setOpen(false));

  function handleSearchPost(event: React.ChangeEvent<HTMLInputElement>) {
    setOpen(true);
    if (event.target.value) {
      setSearchedArticles(
        articles.filter((article) =>
          convertText(article.title).includes(convertText(event.target.value))
        )
      );
      return;
    }
    setSearchedArticles([]);
  }

  function handleShowSearchInput() {
    inputRef.current && inputRef.current.focus();
  }

  return (
    <div ref={searchBoxRef} className="search mr-7">
      <i
        onClick={handleShowSearchInput}
        className="fa-solid fa-magnifying-glass search-icon text-lg cursor-pointer "
      ></i>
      <input
        ref={inputRef}
        onChange={handleSearchPost}
        className="search-input   "
        placeholder="Search..."
      />
      {searchedArticles.length > 0 && open && (
        <div className="search-box shadow-[0px_0px_10px_rgba(0,0,0,0.2)] overflow-auto max-h-[85vh] min-w-[400px] p-3 right-0 bg-white mt-2 rounded-sm">
          <div className="bg-black p-3 text-white font-bold">BÀI VIẾT</div>
          {searchedArticles.map(
            (searchedArticle: articleType, index: number) => (
              <Link
                to={`article/${searchedArticle.slug}`}
                className={`gap-x-3 rounded-sm block  p-2 ${
                  index === searchedArticles.length - 1 ? "" : "border-b"
                } hover:bg-gray-300`}
                key={index}
                onClick={() => setOpen(false)}
              >
                <h3 className="font-bold text-lg">{searchedArticle.title}</h3>
                <p className="text-xs">
                  <span> {searchedArticle.author.username}</span>
                  <span className="text-gray-300 ml-2">
                    posted on {moment(searchedArticle.createdAt).format("lll")}
                  </span>
                </p>
                <p>{searchedArticle.body}</p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
