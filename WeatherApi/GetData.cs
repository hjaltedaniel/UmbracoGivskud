using System;
using System.Web;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;

namespace WeatherApi
{
    public class GetData
    {
        public static string GetWeatherForecast(string path)
        {
            string filePath = path;

            //Check if Json file exists - if not create it
            if (File.Exists(filePath) == false)
            {
                GetJsonWeather(filePath);
            }

            //Check if Json file is up to date - if not create new
            if (IsFileUpToDate(filePath) == false)
            {
                GetJsonWeather(filePath);
            }

            WebClient n = new WebClient();
            string JsonString = n.DownloadString(filePath);
            return JsonString;
        }
        static string GetJsonWeather(string path)
        {
            using (WebClient webClient = new System.Net.WebClient())
            {
                //Get Json from online API
                WebClient n = new WebClient();
                var json = n.DownloadString("http://api.openweathermap.org/data/2.5/forecast?id=2621448&units=metric&APPID=ca813d7d309e67981afde49dc53bddc9");

                //Convert Json from API to a Json-Array
                JObject jsonText = JObject.Parse(json);
                string listArray = JsonConvert.SerializeObject(jsonText["list"]);

                //Parse Json-array
                JArray jsonArray = JArray.Parse(listArray);

                //Make Json Array a list of objects of type WeatherData
                IList<WeatherData> weatherDataList = jsonArray.Select(p => new WeatherData
                {
                    dt_txt = (DateTime)p["dt_txt"],
                    temp = (int)p["main"]["temp"],
                    icon = (string)p["weather"][0]["icon"]
                }).ToList();

                //Convert the new list of objects to Json
                string newJson = JsonConvert.SerializeObject(weatherDataList);

                //Save the new Json file on the server
                System.IO.File.WriteAllText(path, newJson);
                return newJson;
            }
        }

        static bool IsFileUpToDate(string path)
        {
            DateTime nowTime = DateTime.Now;
            DateTime lastWriteTime = File.GetLastWriteTime(path);
            DateTime expirationTime = lastWriteTime.AddHours(+3);

            bool result = expirationTime >= nowTime;

            return result;
        }
    }
}
