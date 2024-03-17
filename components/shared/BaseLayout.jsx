import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = (props) => {
  return (
    <div className="top-0 min-h-screen bg-white flex flex-col w-full">
      <div>
        {/* <Header /> */}
        {props.children}
      </div>
      <div className="mt-auto w-full list-none h-16 bg-gray-200">
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
