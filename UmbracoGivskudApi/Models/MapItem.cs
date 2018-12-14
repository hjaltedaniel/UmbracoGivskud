using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmbracoGivskudApi.Models
{
    public class MapItem
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Title { get; set; }
        public string ImgSrc { get; set; }
        public string Icon { get; set; }
        public string ContentText { get; set; }
        public string VideoLink { get; set; }
    }
}
