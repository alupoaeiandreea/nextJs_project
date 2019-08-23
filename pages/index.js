import React, { Component } from "react";
import Link from "next/link";

import Layout from "../components/Layout";

class Index extends Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Welcome to Next.js Application</h1>
          <Link href="/books">Go to books page</Link>
          <h4>What is Next.js</h4>
          <p>
            Next.js is a universal JavaScript framework created by Zeit and is
            based on React, Webpack, and Babel. It performs server-side
            rendering by default and makes our application optimized for search
            engines. It also lets you add and make dynamic meta tags because
            comes with a Head component that can be imported and used in other
            pages.
          </p>
          <h4>Why use it</h4>
          <p>
            You can use it because it allows us to start very fast an
            application. With another word when we want to create a new React
            application, we don’t need any more to set up many dependencies and
            scripts for React to get up and running, because Next.js comes with
            its configuration and we have only to execute simple commands like
            npm run dev and the application will start to build. It is inspired
            by PHP and benefits from a great system of JavaScript modules and
            because of this, another advantage of using it is that allows you to
            perform individual tests for each component and to download lots of
            modules from npm.
          </p>
        </div>
        <style jsx>{`
          a {
            color: grey;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
