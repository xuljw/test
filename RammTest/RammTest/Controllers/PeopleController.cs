using RammTest.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RammTest.Controllers
{
    public class PeopleController : ApiController
    {
        rammtestdataEntities Data { get; set; }

        public PeopleController()
        {
            Data = new rammtestdataEntities();
        }

        [ActionName("getpeople")]
        public IEnumerable<PersonModel> GetPeople()
        {
            return Data.Person.Select(x => new PersonModel
            { 
                Id = x.Id, 
                Name = x.Name 
            });
        }

        [ActionName("getjobs")]
        public IEnumerable<JobModel> GetJobs([FromUri]Guid id)
        {
            IQueryable<Job> jobs = Data.Job;
            IEnumerable<JobModel> jobsofPerson = jobs.Where(x => x.PersonId == id).Select(x => new JobModel
            {
                 Id = x.Id,
                 Description = x.Description,
                 Done = x.Done
            });
            return jobsofPerson;
        }

        [ActionName("getmarkasdone")]
        public void MarkAsDone(Guid id)
        {
            EFBatchOperation
            IQueryable<Job> jobs = Data.Job.Where(x => x.PersonId ==id).Update(x => new Job () {x.Done = true});
        }

        [ActionName("getresetdonejobs")]
        public void ResetDoneJobs([FromUri]Guid id)
        {
            //Complete this method to set all done jobs belonging to the person with the input id as not done
        }

        #region IDisposable Members

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                Data.Dispose();
            }
        }

        ~PeopleController()
        {
            Dispose(false);
        }

        #endregion
    }
}
