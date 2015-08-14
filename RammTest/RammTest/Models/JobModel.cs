using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace RammTest.Models
{
    public class JobModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
    }
}