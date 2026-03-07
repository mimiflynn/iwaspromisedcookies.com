const path = require("path");

const ARTICLES_PER_PAGE = 1;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String
      date: String
      template: String
      summary: String
      author: String
    }
  `);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query all articles
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/contents/articles/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
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
  `);

  if (result.errors) {
    throw result.errors;
  }

  const articles = result.data.allMarkdownRemark.nodes;
  const articleTemplate = path.resolve("src/templates/article.js");
  const blogListTemplate = path.resolve("src/templates/blog-list.js");

  // Create individual article pages
  articles.forEach((article) => {
    const slug = article.parent.relativeDirectory; // e.g. "articles/2017-04-19-nybg"
    createPage({
      path: `/${slug}/`,
      component: articleTemplate,
      context: {
        id: article.id,
        slug,
      },
    });
  });

  // Create paginated blog list pages
  const numPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  Array.from({ length: numPages }).forEach((_, i) => {
    const pageNum = i + 1;
    createPage({
      path: pageNum === 1 ? "/" : `/page/${pageNum}/`,
      component: blogListTemplate,
      context: {
        limit: ARTICLES_PER_PAGE,
        skip: i * ARTICLES_PER_PAGE,
        numPages,
        currentPage: pageNum,
      },
    });
  });
};
