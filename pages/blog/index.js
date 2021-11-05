import Prismic from 'prismic-javascript';
import Card from '../../components/Blog/Card/Index';
import { useState } from 'react';

const Blog = (props) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const searchItems = (searchValue) => {
    setSearchInput(searchValue.toLowerCase());
    if (searchInput !== '') {
      const filteredData = props.posts.filter((post) => {
        return post.data.title[0].text.toLowerCase().includes(searchInput);
      });
      setFilteredResults(filteredData);
    }
  };

  return (
    <section className='text-gray-600 body-font h-screen'>
      <div className='relative top-0 pt-[17%] overflow-hidden '>
        <img
          className='absolute inset-0 object-cover object-top w-screen h-36 filter blur bg-gradient-to-r from-green-soma to-blue-soma 
          '
        />
      </div>
      <div className='mt-[-10%] md:mt-[-5%] lg:mt-[-14%] w-36 lg:w-96 mx-auto '>
        <div className='relative pt-[56.25%]  rounded-2xl'>
          <a href='/'>
            <img className='absolute inset-0 object-contain' src='../../logo.png' alt='foto' />
          </a>
        </div>
      </div>
      <div className='container px-5 py-6 mx-auto h-full'>
        <div className='w-72 lg:w-96 object-left mb-6'>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='pesquisa'
            type='text'
            placeholder='Pesquisa'
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
        <h1 className='font-bold text-4xl py-3'>Atualizações</h1>
        <p className='pb-6'>Versões disponibilizadas pelos sistemas Somasys </p>
        <div className='-my-8 divide-y-2 divide-gray-100  mx-auto'>
          {searchInput.length > 1
            ? filteredResults.map((post) => {
                return (
                  <Card
                    key={post.id}
                    categoria={post.data.categoria}
                    title={post.data.title[0].text}
                    resumo={post.data.resumo[0].text}
                    postId={post.id}
                    data={post.data.release_date}
                  />
                );
              })
            : props.posts.map((post) => {
                return (
                  <Card
                    key={post.id}
                    categoria={post.data.categoria}
                    title={post.data.title[0].text}
                    resumo={post.data.resumo[0].text}
                    postId={post.id}
                    data={post.data.release_date}
                  />
                );
              })}
        </div>
        {/* <pre>{JSON.stringify(props.posts, null, 2)}</pre> */}
      </div>
      <div className='text-gray-600 body-font bg-gradient-to-l from-green-soma to-blue-soma w-full  bottom-0 '>
        <div className='px-5 mx-auto text-center'>
          <p className='text-lg text-white'>Uma empresa que você pode confiar!</p>
          <p className='text-sm text-white'>© {new Date().getFullYear()} Somasys</p>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps({ res }) {
  const client = await Prismic.client(process.env.PRISMIC_CLIENT);
  const posts = await client.query(Prismic.Predicates.at('document.type', 'blog_post'));

  return {
    props: {
      posts: posts.results,
    },
  };
}

export default Blog;
