import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export const Head = ({ data }) => {
  const { title, summary } = data.markdownRemark.frontmatter;
  const siteName = data.site.siteMetadata.title;
  return (
    <>
      <title>{`${title} - ${siteName}`}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@mimiflynn" />
      <meta name="twitter:title" content={`${siteName} | ${title}`} />
      {summary && <meta name="twitter:description" content={summary} />}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic|Anonymous+Pro:400,700,400italic,700italic|Merriweather:400,700,300"
      />
    </>
  );
};

const ArticleTemplate = ({ data }) => {
  const { title, date } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  const formattedDate = formatDate(date);

  return (
    <Layout pageClass="article-detail" nav={<Link to="/">« Full blog</Link>}>
      <p className="date">
        <span>{formattedDate}</span>
      </p>
      <h1>{title}</h1>
      <article className="article">
        <section
          className="content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
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
  query ArticleQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date
        summary
        author
      }
    }
  }
`;

export default ArticleTemplate;
