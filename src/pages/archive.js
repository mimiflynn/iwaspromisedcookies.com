import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export const Head = ({ data }) => {
  const { title } = data.site.siteMetadata;
  return (
    <>
      <title>{`Archive - ${title}`}</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic|Anonymous+Pro:400,700,400italic,700italic|Merriweather:400,700,300"
      />
    </>
  );
};

const MONTH_NAMES = [
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

const LINE_HEIGHT = 2.2;

const ArchivePage = ({ data }) => {
  const articles = data.allMarkdownRemark.nodes;

  // Group by year then month
  const byYear = {};
  articles.forEach((article) => {
    const d = new Date(article.frontmatter.date);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    if (!byYear[year]) byYear[year] = {};
    if (!byYear[year][month]) byYear[year][month] = [];
    byYear[year][month].push(article);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <Layout>
      <section className="archive">
        <h2>Archive</h2>
        <ul>
          {years.map((year) => {
            const months = byYear[year];
            const monthKeys = Object.keys(months).sort((a, b) => b - a);
            const totalArticles = monthKeys.reduce(
              (sum, m) => sum + months[m].length,
              0
            );
            const yearHeight = LINE_HEIGHT * totalArticles;

            return (
              <li key={year}>
                <span
                  className="year-label"
                  style={{ lineHeight: `${yearHeight}em` }}
                >
                  {year}
                </span>
                <ul style={{ marginLeft: "4em" }}>
                  {monthKeys.map((month) => {
                    const monthArticles = months[month];
                    const monthHeight = LINE_HEIGHT * monthArticles.length;

                    return (
                      <li key={month}>
                        <span
                          className="month-label"
                          style={{ lineHeight: `${monthHeight}em` }}
                        >
                          {MONTH_NAMES[month]}
                        </span>
                        <ul style={{ marginLeft: "7em" }}>
                          {monthArticles.map((article) => {
                            const slug = article.parent.relativeDirectory;
                            return (
                              <li
                                key={slug}
                                style={{
                                  height: `${LINE_HEIGHT}em`,
                                  lineHeight: `${LINE_HEIGHT}em`,
                                }}
                              >
                                <Link to={`/${slug}/`}>
                                  {article.frontmatter.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/contents/articles/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
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

export default ArchivePage;
