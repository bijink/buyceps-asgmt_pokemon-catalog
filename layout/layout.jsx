import Header from "@/components/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        className='container mx-auto px-10'
        style={{ paddingTop: "120px", paddingBottom: "60px" }}
      >
        {children}
      </main>
    </>
  );
}
