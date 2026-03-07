import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "../styles/main.css";

const Layout = ({ children, pageClass, nav }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          description
          owner
        }
      }
      aboutMd: markdownRemark(
        fileAbsolutePath: { regex: "/contents/about\\.md$/" }
      ) {
        html
      }
    }
  `);

  const { title, description, owner } = data.site.siteMetadata;
  const aboutHtml = data.aboutMd?.html ?? "";
  const year = new Date().getFullYear();

  return (
    <div className={pageClass || undefined}>
      <header className="header">
        <div className="content-wrap">
          <div className="logo">
            <h1>
              <Link to="/">{title}</Link>
            </h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </header>
      <div id="content">
        <div className="content-wrap">{children}</div>
      </div>
      <footer>
        <div className="content-wrap">
          {nav && <div className="nav">{nav}</div>}
          <section
            className="about"
            dangerouslySetInnerHTML={{ __html: aboutHtml }}
          />
          <section className="copy">
            <p>
              &copy; {year} {owner} &mdash; powered by&nbsp;
              <a href="https://www.gatsbyjs.com">Gatsby</a>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
