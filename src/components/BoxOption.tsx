interface BoxOptionProps {
  optionList: string[];
  arrayOnClick: any[];
  index?: number;
}

const BoxOption: React.FC<BoxOptionProps> = ({
  optionList,
  arrayOnClick,
  index,
}) => {
  return (
    <div>
      <div
        className={`absolute shadow-md rounded-md bg-white top-[80%] right-0`}
      >
        {optionList.map((option: string, i: number) => (
          <p
            key={option}
            onClick={arrayOnClick[i] && arrayOnClick[i]}
            className="cursor-pointer whitespace-nowrap rounded-t-md px-5 py-2 hover:bg-gray-100"
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BoxOption;
