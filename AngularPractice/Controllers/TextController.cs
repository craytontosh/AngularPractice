using System;
using System.Web.Http;

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
		[Route("api/Text/Fail/{message}")]
		public IHttpActionResult Fail(string message)
		{
			throw new ApplicationException("Bad news bears!");
		}
	}
}
