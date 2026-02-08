import sqlite3 from "sqlite3";
import {open} from "sqlite";

export default async function Weather(){

    const db = await open({
        filename: "./weatherDatabase.db",
        driver: sqlite3.Database
    });
    
    let currentDate = new Date().toJSON().slice(0, 10);
    
    let weatherToday = await db.get("SELECT * FROM weather WHERE id = ?", [currentDate]); //Attempts to retrieve today's data from the DB

    let temperature: number | null = null;
    let conditions: string | null = null;

    if(!weatherToday){
        //No data in DB, so must fetch from API
        console.log("No data found for today. Fetching from API!");
        
        try{
            const apiKey = process.env.WEATHER_API;
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=York, UK`);
            const weatherData = await response.json();

            temperature = weatherData.current?.temperature;
            conditions = weatherData.current?.weather_descriptions?.[0];

            //Inserts the fetched data for today into the DB.
            await db.run(
                "INSERT INTO weather (id, temperature, conditions) VALUES (?, ?, ?)",
                [currentDate, temperature, conditions]
            );
        }
        catch(err){
            console.log(err);
            return <p>Could not fetch data from API</p>
        }
    }
    else{
        console.log("Data found for today. Fetching from DB");
        temperature = weatherToday.temperature;
        conditions = weatherToday.conditions;
    }

    return(
        <>
            <p>Temperature: {temperature}</p>
            <p>Conditions: {conditions}</p>
        </>
    )
}