import Link from "next/link";

const Header = () => {
  return (
    <div className="px-6 h-16 bg-gray-200 flex items-center">
      <Link className="cursor-pointer text-2xl font-bold" href="/">
        Todo List
      </Link>
    </div>
  );
};

export default Header;
