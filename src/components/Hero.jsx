import { useEffect, useState } from "react"

function Hero(){
    const [Data, setData] = useState([])
    const [Page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const nextPage = () => {
        setPage((pre)=> pre + 1)
    }
    const prevPage = () => {
        if(Page <= 0){
            return setPage(0)
        } else{
            setPage(pre => pre -1)
        }
    }
    const url = `https://anime-jokes.p.rapidapi.com/jokes/?page=${Page}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '391506cf94mshac34ca3389ae3abp1eea43jsn920fd142f348',
            'X-RapidAPI-Host': 'anime-jokes.p.rapidapi.com'
        }
    };
    console.log(Page)

    const  fetchData = async()=>{
        setLoading(true)
        try{const response = await fetch(url, options);
            const data = await response.json();
            setLoading(false)
            setData(data)
        }
        catch (error) {
            console.error(error);
            setLoading(true)
        }
    }
    console.log(loading)
    console.log(Data)
    useEffect(()=>{fetchData()}, [Page])
    return(
        <section className="w-5/6 m-auto">
            {
                loading ? <div><h1 className="text-4xl text-center">Loading.....</h1></div>
                :<div className="grid grid-cols-3">
                    <h1 className="col-span-3 text-center text-4xl mt-6 mb-10">Anime Jokes</h1>
                    {Data.map((element) => (
                        <div className="w-5/6">
                            <h1 className="font-bold text-2xl my-4">{element.joke_anime}</h1>
                            <p> <span className="font-bold mr-2 my-2">Setup: </span><span className="italic">{element.setup}</span></p>
                            <p> <span className="font-bold mr-2 my-2">Punchline:</span><span className="italic">{element.punchline}</span></p>
                        </div>
                    ))}
                </div>
            }
            <div className="flex flex-col">
                <button className="col-span-3 mt-6 border-2 w-1/6 m-auto" onClick={nextPage}>Next Page</button>
                <button className="col-span-3 mt-6 border-2 w-1/6 m-auto" onClick={prevPage}>Previous Page</button>
            </div>

        </section>
    )
}

export default Hero