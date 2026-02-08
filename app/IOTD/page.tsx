export default async function IOTD(){
    const API_Key = process.env.NASA_API;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_Key}`);
    const data = await response.json();


    return(
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg text-black font-semibold mb-2">{data.title}</h2>
    
          <img 
            src={data.url} 
            alt={data.title}
            className="rounded-lg shadow-lg max-h-[500px] object-cover"
          />
        </div>
      </div>
    )
}