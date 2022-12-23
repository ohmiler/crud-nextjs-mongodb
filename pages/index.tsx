import Head from 'next/head'
import { useState } from 'react'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import Layout from '../components/Layout'

type Props = {
  posts: [Post]
}

type Post = {
  _id: String;
  title: String;
  content: String;
}

export async function getServerSideProps() {

  try {
    let response = await fetch("http://localhost:3000/api/getPosts");
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) }
    }

  } catch(e) {
    console.error(e);
  }

}

export default function Home(props: Props) {

  const [posts, setPosts] = useState<[Post]>(props.posts);

  const handleDeletePost = async (postId: string) => {
    try {

      let response = await fetch("http://localhost:3000/api/deletePost?id=" + postId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })

      response = await response.json();
      window.location.reload();

    } catch(error) {
      console.log("An error occured while deleting ", error);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className='posts-body'>
          <h1 className='posts-body-heading'>Top 20 posts</h1>
          {posts?.length > 0 ? (
            <ul className='posts-list'>
              {posts.map((post, index) => {
                return (
                  <li key={index} className="post-item">
                    <div className='post-item-details'>
                      <h2>{post.title}</h2>
                      <p>{post.content}</p>
                    </div>
                    <div className='post-item-actions'>
                      <a href={`/posts/${post._id}`}>Edit</a>
                      <button onClick={() => handleDeletePost(post._id as string)}>Delete</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <h2 className='posts-body-heading'>Ooops! No posts...</h2>
          )}
        </div>
      </Layout>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
       
          .posts-body {
            width: 400px;
            margin: 10px auto;
          }

          .posts-body-heading {
            font-family: sans-serif;
          }

          .posts-list {
            list-style: none;
            display: block;
          }

          .post-item {
            width: 100%;
            padding: 10px;
            border: 1px solid #d5d5d5;
          }

          .post-item-actions {
            display: flex;
            justify-content: space-between;
          }

          .post-item-actions a {
            text-decoration: none;
          }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
