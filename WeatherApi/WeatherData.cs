using System;
using System.Collections.Generic;
using System.Text;

namespace WeatherApi
{
    public class WeatherData
    {
        public DateTime dt_txt { get; set; }
        public int temp { get; set; }
        public string icon { get; set; }
    }
}