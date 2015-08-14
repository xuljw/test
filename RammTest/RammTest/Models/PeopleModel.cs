using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace RammTest.Models
{
    public class PersonModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
