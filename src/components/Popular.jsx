
import { useNavigate, } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from"../utils/axios";
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {

    const Navigate = useNavigate();
    const [category, setcategory] = useState("movie")
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="My movie | Popular" + category;

    const GetPopular = async () => {
        try{
         const {data} = await axios.get(
          `${category}/popular?page=${page}`
        );
        //  setpopular(data.results);
        // naya page ata rahe 
        if (data.results.length>0) {
            setpopular((prevState) => [...prevState,...data.results])
            setpage(page+1)
            //  console.log(data);
        }else{
            sethasMore(false);
        }
    
        } catch (error){
        //  console.log ("Error:",error);
        }
       };
    const refershHandler = async () => {
        if (popular.length === 0) {
            GetPopular();
        }else{
            setpage(1);
            setpopular([]);
            GetPopular();
        }
    }  
       useEffect(() => {
      refershHandler();
    
      },[category]);

  return popular . length > 0 ?(
    <div className=' w-screen h-screen '>
        <div className='w-full px-[5%]  flex item-center justify-between'>
            <h1 className='text-2xl font-semibold text-zinc-400 '>
            <i
            onClick={() => Navigate(-1)} 
            className="hover:text-blue-800 ri-arrow-left-line"></i>{""}
             popular</h1>
             <div className ='flex items-center w-[80%]'>
             <Topnav/>
             <Dropdown 
             title="Category"
             options={["movie","tv", "all"]}
             func={(e) =>setcategory(e.target.value)}
                />
             
                </div>
        </div>
  <InfiniteScroll 
  dataLength={popular.length}
  next={GetPopular}
  hasMore={true}
  >
    
 <Cards data={popular} title={category}/>
  </InfiniteScroll>
    </div>
  ):(
    <video className=' ml-24 ' autoPlay loop muted src="loading.mp4"></video>
  )
};

export default Popular