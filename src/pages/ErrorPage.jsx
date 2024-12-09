import NavBar from "../components/NavBar";

function ErrorPage() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Oops! Looks like something went wrong.</h1>
        <p>We couldn't find the page you were looking for.</p>
        <p>
          <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
            Go back to the Home Page
          </a>
        </p>
      </main>
    </>
  );
}

export default ErrorPage;
