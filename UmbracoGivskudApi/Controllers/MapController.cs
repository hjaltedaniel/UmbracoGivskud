using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Umbraco.Core;
using Umbraco.Core.Models;
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

            var contentCurrent = Umbraco.Content(item.Id);
            result.ImgSrc = contentCurrent.GetCropUrl("image", "MapItem");

            if (item.GetValue<string>("icon") != "")
            {
                // Your string which is retrieved from Archetype.
                var imageString2 = item.GetValue<string>("icon");
                // Get the guid from this string.
                var imageGuidUdi2 = GuidUdi.Parse(imageString2);
                // Get the ID of the node!
                var imageNodeId2 = ApplicationContext.Current.Services.EntityService.GetIdForKey(imageGuidUdi2.Guid, (UmbracoObjectTypes)Enum.Parse(typeof(UmbracoObjectTypes), imageGuidUdi2.EntityType, true));
                // Finally, get the node.
                var imageNode2 = Umbraco.TypedMedia(imageNodeId2.Result);
                result.Icon = imageNode2.Url;
            }
            else
            {
                result.Icon = null;
            }
            result.Latitude = item.GetValue<double>("latitudePostion");
            result.Longitude = item.GetValue<double>("longitudePosition");
            result.VideoLink = item.GetValue<string>("linkToVideo");

            return result;
        }
    }
}
