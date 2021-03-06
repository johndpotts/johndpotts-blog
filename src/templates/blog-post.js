
import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Bio from '../components/Bio'
import typography  from '../utils/typography'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import RecommendedArticles from '../components/RecommendedArticles'



const rhythm = typography.rhythm;
const scale = typography.scale
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <Layout location={this.props.location}>
      <div>
        <Helmet>
        <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content={`${post.frontmatter.title} | ${siteTitle}`}/>
        <meta property="og:description" content={post.excerpt}/>
        <meta property="og:image" content={`https://www.johndpotts.com${post.frontmatter.featuredImage.childImageSharp.fluid.src}`}/>
        <meta property="og:url" content={`https://www.johndpotts.com${post.fields.slug}`}/>
        <meta name="twitter:card" content="summary"/>
        <meta property="og:type" content="article"/>
        <meta property="og:locale" content="en_US"/>
        <link rel="shortcut icon" href="/favicon.png"></link>
         <link rel="canonical" href={`https://www.johndpotts.com${post.fields.slug}`}/>
        </Helmet>
        {/* <RecommendedArticles currentArticleSlug={post.fields.slug}></RecommendedArticles> */}
        <h1 
        style={{
          marginTop:rhythm(.5)
        }}
        className="callout-txt">{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        slug 
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        recommended
        featuredImage {
              childImageSharp{
                  fluid(maxWidth: 1000) {
                      src
                  }
              }
          }
      }
    }
  }
`
