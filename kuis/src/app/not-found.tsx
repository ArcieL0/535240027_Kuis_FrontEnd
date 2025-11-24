export default function NotFound() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="display-1 text-primary">404</h1>
              <h2 className="mb-4">Destination Not Found</h2>
              <p className="text-muted mb-4">
                Oops! Looks like you're lost in your travels. 
                This page doesn't exist.
              </p>
              <a href="/" className="btn btn-primary">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}