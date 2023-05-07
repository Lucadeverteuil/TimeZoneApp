
import { Inter } from 'next/font/google'
import { SetStateAction, useEffect, useState } from 'react'
import $ from 'jquery'
import 'select2'; 
import 'select2/dist/css/select2.min.css';
const inter = Inter({ subsets: ['latin'] })
import axios from 'axios';
export default function Home() {
  // State to keep track of which button is active
/-------------------------------------------------/
const [time, setTime] = useState(String);
const [Timeop, setTimeop] = useState(true); //checks to see if time button is active
const [convertTime, setConvertTime] = useState(false); //checks to see if convertTime button is active
const [place1, setPlace1] = useState(""); //checks to see if convertTime button is active
const [place1Time , setPlace1Time] = useState(0); //checks to see if convertTime button is active
const [place2, setPlace2] = useState(''); //checks to see if convertTime button is active
const [place2Time , setPlace2Time] = useState(0); //checks to see if convertTime button is active
const [Country, setCountry] = useState([]); //checks to see if convertTime button is active
const [zoneName, setZoneName] = useState([]); //checks to see if convertTime button is active
const [recieved, setRecived] = useState(false); //checks to see if convertTime button is active





  // Function to keep buttons highlighted after being pressed
  function highlight() {
    $('.btn-time').on('click', function() {
      $('.btn-time').removeClass('active');
      $(this).addClass('active');
    }); 

    $(document).on('click', function(e) {
      // if the click is outside of the button group
      if (!$(e.target).closest('.btn-group').length) {
      // remove the active class from all buttons in the group
        $('.btn-group .btn').removeClass('active');
      }
    });
  }
 
  //chnage place 1 value 
  useEffect(() => {
    $('.test').select2()

    // Add an event listener to the select2 input to update the selected value
    $('.test').on('select2:select', (e) => {
      setPlace1((e.target as HTMLSelectElement).value)
    })

    // Clean up the event listener when the component unmounts
    return () => {
      $('.test').off('select2:select')
    }

    
  }, [])

  useEffect(() => {
    const apiKey = 'OAWPEEA4O00N';
    // const latitude = 37.7749; // example latitude value
    // const longitude = -122.4194; // example longitude value
  
    axios
      .get(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`)
      .then((response) => {
        const countryNames = response.data.zones.map((zones: { zoneName: any; }) => zones.zoneName);
         setCountry(countryNames);
         setRecived(true);


      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    const apiKey = 'OAWPEEA4O00N';
    // const latitude = 37.7749; // example latitude value
    // const longitude = -122.4194; // example longitude value
  
    axios
      .get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${place1}`)
      .then((response) => {
        const timestamp = response.data.formatted;

         setTime(timestamp.toString())
         setRecived(true);


      })
      .catch((error) => {
        console.log(error);
      });
  }, [place1]);




  return (
    <main> 
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
      <h1 className= "header-title mb-4 text-4xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-[#C0C0C0]">Time Zone App</h1>

      
            <div className="flex-row absolute rounded-md shadow-sm my-1 w-full" role="group" onClick={highlight}>
              <button type="button" className="btn-time active py-2 mx-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-[#191c29] dark:border-[#191c29] dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white px-8 ">
                Time
              </button>
             
              <button type="button" className="btn-time px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-[#191c29] dark:border-[#191c29] dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                ConvertTime
              </button>
            </div>
            
            <div className='flex'>
              {
                
            Timeop ?
            <div className="card">  
            <div>
              <form className='flex absolute left-3 top-5' > 
                <label htmlFor="Place" className='mx-20'>Place: </label>
                <select className="block test w-40" name="state" value = {place1} > 
                {recieved ? Country.map((country: any) =>{return(
                  <option key={country} value={country}>{country}</option>)}): null}
                </select>
              </form>
              </div>
              <br/>
              <div className='flex absolute left-3 top-20'> <br></br>
               <p className='mx-20'> Time: <div className='inline-block mx-3'>{time}</div> </p> <br></br>
              </div>
              </div> 
              : 
            convertTime ?
             <div>ConverTime</div> 
             :
              <ol className='block m-auto'>
              <li className="text-gray-900 dark:text-white mx-5"><b>Time: </b> Lets you see the Time in anywhere in the world</li>
              <br/>
              <li className="text-gray-900 dark:text-white mx-5"><b>ConvertTime:</b> Lets you convert the time from one timezone to another</li>
            </ol> 

          }

            </div>
            
    </main>
  )
}


