//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder v3.0.10.102
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Umbraco.ModelsBuilder;
using Umbraco.ModelsBuilder.Umbraco;

namespace Umbraco.Web.PublishedContentModels
{
	/// <summary>Map Categories</summary>
	[PublishedContentModel("MapCategories")]
	public partial class MapCategories : PublishedContentModel
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "MapCategories";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public MapCategories(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<MapCategories, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Category Icon
		///</summary>
		[ImplementPropertyType("categoryIcon")]
		public IPublishedContent CategoryIcon
		{
			get { return this.GetPropertyValue<IPublishedContent>("categoryIcon"); }
		}

		///<summary>
		/// Category Icon Active
		///</summary>
		[ImplementPropertyType("categoryIconActive")]
		public IPublishedContent CategoryIconActive
		{
			get { return this.GetPropertyValue<IPublishedContent>("categoryIconActive"); }
		}

		///<summary>
		/// Category Name
		///</summary>
		[ImplementPropertyType("categoryName")]
		public string CategoryName
		{
			get { return this.GetPropertyValue<string>("categoryName"); }
		}
	}
}
