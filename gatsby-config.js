module.exports = {
  siteMetadata: {
    title: "iwaspromisedcookies",
    description: "curiosities",
    siteUrl: "https://iwaspromisedcookies.com",
    owner: "Mimi Flynn",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "contents",
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return {
                  title: node.frontmatter.title,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    "/" +
                    node.parent.relativeDirectory +
                    "/",
                  guid:
                    site.siteMetadata.siteUrl +
                    "/" +
                    node.parent.relativeDirectory +
                    "/",
                  custom_elements: [{ "content:encoded": node.html }],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/contents/articles/" } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    html
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
            `,
            output: "/feed.xml",
            title: "iwaspromisedcookies RSS Feed",
          },
        ],
      },
    },
  ],
};
