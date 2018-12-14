using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Umbraco.Core.Services;
using Umbraco.Web.WebApi;
using UmbracoGivskudApi.Models;

namespace UmbracoGivskudApi.Controllers
{
    public class MapController : UmbracoApiController
    {
        [HttpGet]
        public MapItem Get(int id)
        {
            IContentService cs = Services.ContentService;

            var item = cs.GetById(id);

            MapItem result = new MapItem();
            result.Id = item.Id;
            result.Title = item.GetValue<string>("title");
            result.ContentText = item.GetValue<string>("contentText");
            result.ImgSrc = item.GetValue<string>("image");
            result.VideoLink = item.GetValue<string>("linkToVideo");

            return result;
        }
    }
}
