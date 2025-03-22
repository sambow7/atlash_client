import Navbar from "../components/Navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;