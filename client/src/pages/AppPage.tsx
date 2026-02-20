import { useNavigate } from "react-router-dom";

function AppPage() {
  const navigate = useNavigate();
  function handleParticipate () {
    navigate("/signup")
  }
  return (
    <>
      <div>
        <div className="md:flex h-10/12">
          <header className="h-1/6 w-full text-3xl font-bold md:w-1/2 md:h-full md:bg-black">
            <h1 className="ml-10 text-orange-500 md:mt-56 md:mb-72 md:ml-20 lg:text-9xl md:text-8xl md:text-white">
              XPlain
            </h1>
          </header>
          <main className="mt-4 md:mt-16 h-5/6 md:w-1/2 md:h-full flex flex-col items-center">
            <section className="flex flex-col justify-start mx-3">
              <h1 className="mt-10 text-6xl font-bold text-orange-500 md:text-8xl">
                Connect to the World
              </h1>
              <h3 className="text-xl md:text-2xl mt-5 md:mt-10">
                A place to share ideas & deepen your understanding
              </h3>
              <h2 className="mt-10 text-xl font-semibold md:mt-20 md:text-3xl">
                Join Now
              </h2>
            </section>
            <section className="flex flex-col justify-center items-center mt-5 gap-5">
              <button className="w-48 text-xl text-center rounded-full bg-orange-500 text-white md:w-60 md:h-10 md:text-2xl cursor-pointer" onClick={handleParticipate}>
                Perticipate
              </button>
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
        <footer className="mt-20 md:mt-6 flex flex-wrap h-1/12 w-full gap-x-5 justify-center">
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

export default AppPage;
