import Blocks from '../components/Blocks'

const Home = () => {
  return (
    <>
      <div className='main_class '>
        <span className='text-center'>
          <section className="section1 align-items-center" style= {{'height': '100vh'}}>
            <h1>Home Page</h1>
            <Blocks />
          </section>
        </span>
      </div>
    </>
  )
}

export default Home
