using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Keyroll.KVM
{
    public class Section
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
