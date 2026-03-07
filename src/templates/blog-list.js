import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export const Head = ({ data }) => {
  const { title, description, siteUrl } = data.site.siteMetadata;
  return (
    <>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@mimiflynn" />
      <link
        rel="alternate"
        href={`${siteUrl}/feed.xml`}
        type="application/rss+xml"
        title={description}
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic|Anonymous+Pro:400,700,400italic,700italic|Merriweather:400,700,300"
      />
    </>
  );
};

const BlogList = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const articles = data.allMarkdownRemark.nodes;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < numPages ? currentPage + 1 : null;

  const nav = (
    <>
      {prevPage ? (
        <Link to={prevPage === 1 ? "/" : `/page/${prevPage}/`}>« Newer</Link>
      ) : (
        <Link to="/archive/">« Archives</Link>
      )}
      {nextPage && <Link to={`/page/${nextPage}/`}>Next page »</Link>}
    </>
  );

  return (
    <Layout nav={nav}>
      {articles.map((article) => {
        const slug = article.parent.relativeDirectory;
        const { title, date } = article.frontmatter;
        const formattedDate = formatDate(date);
        const intro = article.excerpt;

        return (
          <article key={slug} className="article intro">
            <header>
              <p className="date">
                <span>{formattedDate}</span>
              </p>
              <h2>
                <Link to={`/${slug}/`}>{title}</Link>
              </h2>
            </header>
            <section className="content">
              {intro && <p>{intro}</p>}
              <p className="more">
                <Link to={`/${slug}/`}>more</Link>
              </p>
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${day}. ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/contents/articles/" } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt(pruneLength: 300)
        parent {
          ... on File {
            relativeDirectory
          }
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`;

export default BlogList;
