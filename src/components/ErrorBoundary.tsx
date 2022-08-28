import React from "react";

class ErrorBoundary extends React.Component {
 constructor(props: any) {
  super(props);
  this.state = { hasError: false };
 }
 static getDerivedStateFromError(error) {
  return { hasError: true };
 }
 componentDidCatch(error, errorInfo) {}

 render() {
  if ((this.state as any).hasError) {
   return (
    <div style={{ width: "100vw", height: "100vh", display: "grid", placeItems: "center" }}>
     <div style={{ textAlign: "center" }} className="flex column center">
      <h2>Oops, there is an error!</h2>
      <button
       className="btn secondary"
       type="button"
       onClick={() => this.setState({ hasError: false })}
      >
       Try again?
      </button>
     </div>
    </div>
   );
  }

  // Return children components in case of no error
  return (this.props as any).children;
 }
}

export default ErrorBoundary;
