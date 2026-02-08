function Home() {
  return (
    <>
      <div>
        <div className="border md:flex h-10/12">
          <header className="border h-1/6 w-full bg-blue-100 text-3xl font-bold md:w-1/2 md:h-full md:text-9xl">
            <h1 className="ml-10 md:mt-56 md:mb-14 md:ml-20">LOGO</h1>
          </header>
          <main className="border h-5/6 md:w-1/2 md:h-full flex flex-col items-center">
            <section className="flex flex-col justify-start mx-3">
              <h1 className="mt-10 text-6xl font-bold text-green-600">
                Connect &nbsp;&nbsp;&nbsp;&nbsp; to &nbsp; the World
              </h1>
              <h3 className="text-xl font-light mt-5">
                A place to share ideas & deepen your understanding
              </h3>
              <h2 className="text-xl mt-5">Join Now</h2>
            </section>
            <section className="flex flex-col justify-center items-center mt-5">
              <h5 className="w-48 text-xl text-center border rounded-full bg-black text-white md:w-60 md:h-10 md:text-2xl cursor-pointer">
                Perticipate
              </h5>
              <p className="text-center">
                By signing up, you agree to the{" "}
                <a href="" className="text-blue-900">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="" className="text-blue-900">
                  Privacy Policy
                </a>
                , including{" "}
                <a href="" className="text-blue-900">
                  Cookie Use.
                </a>
              </p>
            </section>
          </main>
        </div>
        <footer className="flex flex-wrap h-1/12 w-full gap-x-5 justify-center">
          <h6>Help Center</h6>
          <h6>About</h6>
          <h6>Terms of Service</h6>
          <h6>Privacy Policy</h6>
          <h6>Cookie Policy</h6>
          <h6>Developers</h6>
          <h6>&copy;2026 LOGO Corp.</h6>
        </footer>
      </div>
    </>
  );
}

export default Home;
