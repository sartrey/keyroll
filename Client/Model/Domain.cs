using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Keyroll.Model
{
    public class Domain
    {
        private string _Name
            = null;

        private List<Record> _Records 
            = new List<Record>();

        public List<Record> Records 
        {
            get { return _Records; }
        }
    }
}
