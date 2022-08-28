import Head from "../components/Head";

function Error({ statusCode }) {
 return (
  <>
   <Head title="Oops" />
   <p>
    {statusCode
     ? `An error ${statusCode} occurred on the server`
     : "An error occurred on the client"}
   </p>
  </>
 );
}

Error.getInitialProps = ({ res, err }) => {
 const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
 return { statusCode };
};

export default Error;
