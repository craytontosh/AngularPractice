using System;
using System.Web.Http;
using System.Web.Razor.Parser;

namespace AngularPractice.Controllers
{
	public class TextController : ApiController
	{
		[HttpGet]
		[Route("api/Text/Success/{message}")]
		public IHttpActionResult Success(string message)
		{
			return Json(message);
		}

		[HttpGet]
		[Route("api/Text/Fail/")]
		public IHttpActionResult Fail()
		{
			throw new ApplicationException("Bad news bears!");
		}

		[HttpGet]
		[Route("api/Text/Greeting")]
		public IHttpActionResult Wow()
		{
			return Json("Welcome!");
		}
	}
}
